package com.nil.behisebe.ui.screens.addedit

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.nil.behisebe.BehisebeApp
import com.nil.behisebe.data.model.Category
import com.nil.behisebe.data.model.Expense
import com.nil.behisebe.data.repository.CategoryRepository
import com.nil.behisebe.data.repository.ExpenseRepository
import com.nil.behisebe.utils.toIso
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import java.time.LocalDate

data class AddEditUiState(
    val amountText: String = "",
    val note: String = "",
    val selectedCategoryId: Long? = null,
    val date: LocalDate = LocalDate.now(),
    val isLoading: Boolean = false,
    val isSaved: Boolean = false,
)

class AddEditViewModel(app: Application) : AndroidViewModel(app) {
    private val appInstance: BehisebeApp = app as BehisebeApp
    private val expenseRepo: ExpenseRepository = appInstance.expenseRepository
    private val categoryRepo: CategoryRepository = appInstance.categoryRepository

    val categories: StateFlow<List<Category>> = categoryRepo.getAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    val uiState = MutableStateFlow(AddEditUiState())

    fun loadExpense(id: Long) {
        viewModelScope.launch {
            uiState.update { it.copy(isLoading = true) }
            val item = expenseRepo.getByIdWithCategory(id) ?: return@launch
            uiState.update {
                it.copy(
                    amountText = item.expense.amount.toString(),
                    note = item.expense.note,
                    selectedCategoryId = item.expense.categoryId,
                    date = LocalDate.parse(item.expense.date),
                    isLoading = false,
                )
            }
        }
    }

    fun onAmountChange(value: String) = uiState.update { it.copy(amountText = value) }
    fun onNoteChange(value: String) = uiState.update { it.copy(note = value) }
    fun onCategorySelected(id: Long?) = uiState.update { it.copy(selectedCategoryId = id) }
    fun onDateChange(date: LocalDate) = uiState.update { it.copy(date = date) }

    fun save(existingId: Long?) {
        val amount = uiState.value.amountText.toDoubleOrNull() ?: return
        viewModelScope.launch {
            val expense = Expense(
                id = existingId ?: 0L,
                amount = amount,
                note = uiState.value.note.trim(),
                categoryId = uiState.value.selectedCategoryId,
                date = uiState.value.date.toIso(),
            )
            if (existingId != null) expenseRepo.update(expense) else expenseRepo.insert(expense)
            uiState.update { it.copy(isSaved = true) }
        }
    }
}
