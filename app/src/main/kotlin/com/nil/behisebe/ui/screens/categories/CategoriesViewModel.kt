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

class CategoriesViewModel(app: Application) : AndroidViewModel(app) {
    private val repo: CategoryRepository = (app as BehisebeApp).categoryRepository

    val categories = repo.getAll()
        .stateIn(viewModelScope, SharingStarted.WhileSubscribed(5_000), emptyList())

    fun addCategory(name: String, icon: String, color: Int) {
        viewModelScope.launch {
            repo.insert(Category(name = name, icon = icon, color = color))
        }
    }

    fun deleteCategory(category: Category) {
        viewModelScope.launch { repo.delete(category) }
    }
}
