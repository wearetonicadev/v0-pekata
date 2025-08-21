import { NextResponse } from "next/server"

export async function GET() {
  const homeShipments = {
    totalLines: 1541,
    statuses: [
      { name: "Entregado", count: 102, percentage: 30, color: "#bf0000" },
      { name: "Enviado", count: 209, percentage: 25, color: "#2e9858" },
      { name: "Preparación", count: 435, percentage: 20, color: "#f1c05b" },
      { name: "Cancelado", count: 24, percentage: 15, color: "#bfb7f0" },
    ],
  }

  return NextResponse.json(homeShipments)
}
