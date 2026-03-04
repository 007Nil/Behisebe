package com.nil.behisebe

import android.app.Application
import com.nil.behisebe.data.db.AppDatabase
import com.nil.behisebe.data.repository.CategoryRepository
import com.nil.behisebe.data.repository.ExpenseRepository

class BehisebeApp : Application() {
    val database by lazy { AppDatabase.getInstance(this) }
    val expenseRepository by lazy { ExpenseRepository(database.expenseDao()) }
    val categoryRepository by lazy { CategoryRepository(database.categoryDao()) }
}
