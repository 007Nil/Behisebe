package com.nil.behisebe.ui.screens.home

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.nil.behisebe.BehisebeApp
import com.nil.behisebe.data.model.Expense
import com.nil.behisebe.data.model.ExpenseWithCategory
import com.nil.behisebe.data.repository.ExpenseRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

data class HomeUiState(
    val months: List<String> = emptyList(),
    val selectedMonth: String = "",
    val expenses: List<ExpenseWithCategory> = emptyList(),
    val monthTotal: Double = 0.0,
)

class HomeViewModel(app: Application) : AndroidViewModel(app) {
    private val repo: ExpenseRepository = (app as BehisebeApp).expenseRepository

    private val selectedMonth = MutableStateFlow("")

    val months: StateFlow<List<String>> = repo.getDistinctMonths()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    val uiState: StateFlow<HomeUiState> = combine(
        months,
        selectedMonth,
    ) { monthList, selected ->
        val active = selected.ifEmpty { monthList.firstOrNull() ?: "" }
        active
    }.flatMapLatest { activeMonth ->
        combine(
            months,
            repo.getByMonthWithCategory(activeMonth),
        ) { monthList, expenses ->
            HomeUiState(
                months = monthList,
                selectedMonth = activeMonth,
                expenses = expenses,
                monthTotal = expenses.sumOf { it.expense.amount },
            )
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), HomeUiState())

    fun selectMonth(month: String) {
        selectedMonth.value = month
    }

    fun deleteExpense(expense: Expense) {
        viewModelScope.launch { repo.delete(expense) }
    }
}
