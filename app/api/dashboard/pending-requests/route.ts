import { NextResponse } from "next/server"

export async function GET() {
  const pendingRequests = {
    productChange: {
      count: 1456,
      label: "empleados",
    },
    attentionDeadline: {
      count: 1456,
      label: "empleados",
    },
  }

  return NextResponse.json(pendingRequests)
}
