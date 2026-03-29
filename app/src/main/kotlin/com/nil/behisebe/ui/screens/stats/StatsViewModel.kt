package com.nil.behisebe.ui.screens.stats

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.nil.behisebe.BehisebeApp
import com.nil.behisebe.data.model.Category
import com.nil.behisebe.data.repository.ExpenseRepository
import com.nil.behisebe.utils.toIso
import java.time.LocalDate
import java.time.format.TextStyle
import java.util.Locale
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.combine
import kotlinx.coroutines.flow.flatMapLatest
import kotlinx.coroutines.flow.map
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update

data class CategoryTotal(val category: Category?, val total: Double)
data class DayTotal(val date: String, val label: String, val amount: Double)

data class StatsUiState(
    val months: List<String> = emptyList(),
    val selectedMonth: String = "",
    val categoryTotals: List<CategoryTotal> = emptyList(),
    val grandTotal: Double = 0.0,
    val weeklyTotals: List<DayTotal> = emptyList(),
)

@OptIn(kotlinx.coroutines.ExperimentalCoroutinesApi::class)
class StatsViewModel(app: Application) : AndroidViewModel(app) {
    private val repo: ExpenseRepository = (app as BehisebeApp).expenseRepository
    private val selectedMonth = MutableStateFlow("")

    val months: StateFlow<List<String>> = repo.getDistinctMonths()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    private val weeklyTotalsFlow = repo.getAllWithCategory().map { all ->
        val today = LocalDate.now()
        (6 downTo 0).map { daysBack ->
            val date = today.minusDays(daysBack.toLong())
            val isoDate = date.toIso()
            DayTotal(
                date = isoDate,
                label = date.dayOfWeek.getDisplayName(TextStyle.SHORT, Locale.getDefault()),
                amount = all.filter { it.expense.date == isoDate }.sumOf { it.expense.amount },
            )
        }
    }

    val uiState: StateFlow<StatsUiState> = combine(
        months, selectedMonth
    ) { monthList, selected ->
        selected.ifEmpty { monthList.firstOrNull() ?: "" }
    }.flatMapLatest { activeMonth ->
        combine(months, repo.getByMonthWithCategory(activeMonth), weeklyTotalsFlow) { monthList, expenses, weekly ->
            val totals = expenses
                .groupBy { it.category }
                .map { (cat, items) -> CategoryTotal(cat, items.sumOf { it.expense.amount }) }
                .sortedByDescending { it.total }
            StatsUiState(
                months = monthList,
                selectedMonth = activeMonth,
                categoryTotals = totals,
                grandTotal = expenses.sumOf { it.expense.amount },
                weeklyTotals = weekly,
            )
        }
    }.stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), StatsUiState())

    fun selectMonth(month: String) = selectedMonth.update { month }
}
