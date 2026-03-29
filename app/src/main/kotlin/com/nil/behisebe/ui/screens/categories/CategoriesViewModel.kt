package com.nil.behisebe.ui.screens.categories

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.nil.behisebe.BehisebeApp
import com.nil.behisebe.data.model.Category
import com.nil.behisebe.data.repository.CategoryRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

private val palette = listOf(
    0xFFFF6B6B, 0xFF4ECDC4, 0xFFA78BFA, 0xFF34D399,
    0xFFFB923C, 0xFF60A5FA, 0xFF94A3B8, 0xFFF472B6,
    0xFFE879F9, 0xFF2DD4BF, 0xFFFBBF24, 0xFF6366F1,
).map { it.toInt() }

class CategoriesViewModel(app: Application) : AndroidViewModel(app) {
    private val repo: CategoryRepository = (app as BehisebeApp).categoryRepository

    val categories = repo.getAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun addCategory(name: String, icon: String) {
        val usedColors = categories.value.map { it.color }.toSet()
        val color = palette.firstOrNull { it !in usedColors }
            ?: palette[categories.value.size % palette.size]
        viewModelScope.launch {
            repo.insert(Category(name = name, icon = icon, color = color))
        }
    }

    fun updateCategory(category: Category) {
        viewModelScope.launch { repo.update(category) }
    }

    fun deleteCategory(category: Category) {
        viewModelScope.launch { repo.delete(category) }
    }
}
