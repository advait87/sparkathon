import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Sample store data - replace with your actual data source
    const stores = [
      {
        id: "1",
        name: "Store #001 - Koramangala",
        type: "dark",
        status: "warning",
        demand: 78,
        stock: 45,
        lat: 12.9352,
        lng: 77.6245,
        address: "Koramangala, Bangalore",
        manager: "Rajesh Kumar",
        categories: {
          sports: { stock: 70, demand: 85, trend: "up" },
          travel: { stock: 40, demand: 92, trend: "up" },
          essentials: { stock: 80, demand: 65, trend: "stable" }
        },
        alerts: [
          {
            type: "warning",
            message: "Water bottles running low",
            time: "15 min ago"
          }
        ]
      },
      {
        id: "2",
        name: "Store #002 - Whitefield",
        type: "dark",
        status: "good",
        demand: 65,
        stock: 78,
        lat: 12.9698,
        lng: 77.7500,
        address: "Whitefield, Bangalore",
        manager: "Priya Sharma",
        categories: {
          sports: { stock: 75, demand: 60, trend: "stable" },
          travel: { stock: 55, demand: 70, trend: "up" },
          essentials: { stock: 85, demand: 50, trend: "down" }
        },
        alerts: []
      },
      {
        id: "3",
        name: "FC Bangalore Central",
        type: "fulfillment",
        status: "critical",
        demand: 95,
        stock: 25,
        lat: 12.9716,
        lng: 77.5946,
        address: "Central Bangalore",
        manager: "Amit Patel",
        categories: {
          sports: { stock: 30, demand: 98, trend: "up" },
          travel: { stock: 20, demand: 95, trend: "up" },
          essentials: { stock: 25, demand: 90, trend: "up" }
        },
        alerts: [
          {
            type: "critical",
            message: "Multiple items critically low",
            time: "5 min ago"
          }
        ]
      }
    ]

    return NextResponse.json({
      data: stores,
      success: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json(
      { 
        data: null,
        success: false,
        message: 'Failed to fetch stores',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
