package com.nil.behisebe.data.db

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Transaction
import androidx.room.Update
import com.nil.behisebe.data.model.Expense
import com.nil.behisebe.data.model.ExpenseWithCategory
import kotlinx.coroutines.flow.Flow

@Dao
interface ExpenseDao {
    @Transaction
    @Query("SELECT * FROM expenses ORDER BY date DESC, id DESC")
    fun getAllWithCategory(): Flow<List<ExpenseWithCategory>>

    @Transaction
    @Query("SELECT * FROM expenses WHERE date LIKE :monthPrefix || '%' ORDER BY date DESC, id DESC")
    fun getByMonthWithCategory(monthPrefix: String): Flow<List<ExpenseWithCategory>>

    @Transaction
    @Query("SELECT * FROM expenses WHERE id = :id")
    suspend fun getByIdWithCategory(id: Long): ExpenseWithCategory?

    @Query("SELECT DISTINCT substr(date, 1, 7) FROM expenses ORDER BY date DESC")
    fun getDistinctMonths(): Flow<List<String>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(expense: Expense): Long

    @Update
    suspend fun update(expense: Expense)

    @Delete
    suspend fun delete(expense: Expense)
}
