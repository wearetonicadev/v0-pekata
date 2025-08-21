import { NextResponse } from "next/server"

export async function GET() {
  const metrics = {
    totalLines: 1456,
    selectedLines: { value: 1456, percentage: 45 },
    selectedLinesSecond: { value: 1456, percentage: 45 },
    employees: 213,
    authorizedOrders: 1456,
    totalAmount: "4.567€",
  }

  return NextResponse.json(metrics)
}
