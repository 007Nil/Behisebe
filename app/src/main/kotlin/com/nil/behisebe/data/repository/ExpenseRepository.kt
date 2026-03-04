package com.nil.behisebe.data.repository

import com.nil.behisebe.data.db.ExpenseDao
import com.nil.behisebe.data.model.Expense
import com.nil.behisebe.data.model.ExpenseWithCategory
import kotlinx.coroutines.flow.Flow

class ExpenseRepository(private val dao: ExpenseDao) {
    fun getAllWithCategory(): Flow<List<ExpenseWithCategory>> = dao.getAllWithCategory()

    fun getByMonthWithCategory(yearMonth: String): Flow<List<ExpenseWithCategory>> =
        dao.getByMonthWithCategory(yearMonth)

    fun getDistinctMonths(): Flow<List<String>> = dao.getDistinctMonths()

    suspend fun getByIdWithCategory(id: Long): ExpenseWithCategory? = dao.getByIdWithCategory(id)

    suspend fun insert(expense: Expense): Long = dao.insert(expense)

    suspend fun update(expense: Expense) = dao.update(expense)

    suspend fun delete(expense: Expense) = dao.delete(expense)
}
