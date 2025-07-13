import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Sample KPI data - replace with your actual data source
    const kpis = [
      {
        title: "SKUs in Danger Zone",
        value: "1",
        total: "3",
        percentage: 33,
        type: "ring",
        color: "text-red-600",
        bgColor: "bg-red-50"
      },
      {
        title: "Fill Rate vs Forecast",
        value: "94.2%",
        change: "+2.1%",
        trend: "up",
        type: "sparkline",
        color: "text-green-600",
        bgColor: "bg-green-50"
      },
      {
        title: "Urgent Alerts",
        value: "3",
        type: "badge",
        color: "text-orange-600",
        bgColor: "bg-orange-50"
      },
      {
        title: "Avg Restock Lead Time",
        value: "2.4",
        unit: "days",
        change: "-0.3",
        type: "metric",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      },
      {
        title: "Forecast Confidence",
        value: "87.3%",
        type: "percentage",
        color: "text-purple-600",
        bgColor: "bg-purple-50"
      }
    ]

    return NextResponse.json({
      data: kpis,
      success: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        data: null,
        success: false,
        message: 'Failed to fetch KPIs',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
