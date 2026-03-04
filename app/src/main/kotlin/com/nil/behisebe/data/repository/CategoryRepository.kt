package com.nil.behisebe.data.repository

import com.nil.behisebe.data.db.CategoryDao
import com.nil.behisebe.data.model.Category
import kotlinx.coroutines.flow.Flow

class CategoryRepository(private val dao: CategoryDao) {
    fun getAll(): Flow<List<Category>> = dao.getAll()

    suspend fun insert(category: Category): Long = dao.insert(category)

    suspend fun update(category: Category) = dao.update(category)

    suspend fun delete(category: Category) = dao.delete(category)
}
