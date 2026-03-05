package com.nil.behisebe.ui.components

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class DonutSlice(val color: Color, val fraction: Float)

@Composable
fun DonutChart(
    slices: List<DonutSlice>,
    centerLabel: String,
    modifier: Modifier = Modifier,
    size: Dp = 220.dp,
    strokeWidth: Dp = 36.dp,
) {
    val background = MaterialTheme.colorScheme.background
    Box(modifier = modifier.size(size), contentAlignment = Alignment.Center) {
        Canvas(modifier = Modifier.size(size)) {
            val stroke = Stroke(width = strokeWidth.toPx(), cap = StrokeCap.Butt)
            val inset = strokeWidth.toPx() / 2f
            val arcSize = Size(this.size.width - inset * 2, this.size.height - inset * 2)
            val topLeft = Offset(inset, inset)
            val gap = 2f // degrees gap between slices

            // Background ring
            drawArc(
                color = background,
                startAngle = -90f,
                sweepAngle = 360f,
                useCenter = false,
                topLeft = topLeft,
                size = arcSize,
                style = Stroke(width = strokeWidth.toPx() + 4.dp.toPx()),
            )

            var startAngle = -90f
            slices.forEach { slice ->
                val sweep = (slice.fraction * 360f) - gap
                if (sweep > 0f) {
                    drawArc(
                        color = slice.color,
                        startAngle = startAngle + gap / 2f,
                        sweepAngle = sweep,
                        useCenter = false,
                        topLeft = topLeft,
                        size = arcSize,
                        style = stroke,
                    )
                }
                startAngle += slice.fraction * 360f
            }
        }
        Text(
            text = centerLabel,
            style = MaterialTheme.typography.titleMedium,
            fontWeight = FontWeight.Bold,
        )
    }
}
