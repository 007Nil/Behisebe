package com.nil.behisebe.utils

import java.time.LocalDate
import java.time.YearMonth
import java.time.format.DateTimeFormatter

private val displayDateFormatter = DateTimeFormatter.ofPattern("d MMM yyyy")
private val monthFormatter = DateTimeFormatter.ofPattern("MMMM yyyy")
private val isoFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd")

fun String.toDisplayDate(): String =
    runCatching { LocalDate.parse(this, isoFormatter).format(displayDateFormatter) }
        .getOrDefault(this)

fun String.toDisplayMonth(): String =
    runCatching { YearMonth.parse(this).format(monthFormatter) }
        .getOrDefault(this)

fun LocalDate.toIso(): String = format(isoFormatter)

fun Double.toCurrency(): String = "₹ %,.2f".format(this)
