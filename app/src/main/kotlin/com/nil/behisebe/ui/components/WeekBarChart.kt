package com.nil.behisebe.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.CornerRadius
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.nil.behisebe.ui.screens.stats.DayTotal
import com.nil.behisebe.utils.toIso
import java.time.LocalDate

@Composable
fun WeekBarChart(
    days: List<DayTotal>,
    modifier: Modifier = Modifier,
) {
    if (days.isEmpty()) return

    val today = LocalDate.now().toIso()
    val maxAmount = days.maxOf { it.amount }.takeIf { it > 0.0 } ?: 1.0

    val primaryColor = MaterialTheme.colorScheme.primary
    val barColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.25f)
    val trackColor = MaterialTheme.colorScheme.surfaceVariant

    Row(
        modifier = modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(6.dp),
        verticalAlignment = Alignment.Bottom,
    ) {
        days.forEach { day ->
            val fraction = (day.amount / maxAmount).toFloat().coerceIn(0f, 1f)
            val isToday = day.date == today
            val color = if (isToday) primaryColor else barColor

            Column(
                modifier = Modifier.weight(1f),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(4.dp),
            ) {
                // Amount label above bar (only when non-zero)
                if (day.amount > 0.0) {
                    Text(
                        text = "₹${"%,.0f".format(day.amount)}",
                        fontSize = 8.sp,
                        color = if (isToday) primaryColor else MaterialTheme.colorScheme.onSurfaceVariant,
                        fontWeight = if (isToday) FontWeight.Bold else FontWeight.Normal,
                        maxLines = 1,
                    )
                } else {
                    Text(text = "", fontSize = 8.sp) // placeholder to keep alignment
                }

                // Bar
                Canvas(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(80.dp)
                ) {
                    val barWidth = size.width
                    val totalHeight = size.height
                    val minBarHeight = 4.dp.toPx()
                    val barHeight = (fraction * totalHeight).coerceAtLeast(
                        if (day.amount > 0) minBarHeight else 0f
                    )
                    val cornerRadius = CornerRadius(4.dp.toPx())

                    // Track (background)
                    drawRoundRect(
                        color = trackColor,
                        topLeft = Offset(0f, 0f),
                        size = Size(barWidth, totalHeight),
                        cornerRadius = cornerRadius,
                    )

                    // Bar fill (from bottom)
                    if (barHeight > 0f) {
                        drawRoundRect(
                            color = color,
                            topLeft = Offset(0f, totalHeight - barHeight),
                            size = Size(barWidth, barHeight),
                            cornerRadius = cornerRadius,
                        )
                    }
                }

                // Day label
                Text(
                    text = day.label.take(3),
                    fontSize = 10.sp,
                    color = if (isToday) primaryColor else MaterialTheme.colorScheme.onSurfaceVariant,
                    fontWeight = if (isToday) FontWeight.Bold else FontWeight.Normal,
                )
            }
        }
    }
}
