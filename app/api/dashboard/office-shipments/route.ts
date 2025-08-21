import { NextResponse } from "next/server"

export async function GET() {
  const officeShipments = {
    deliveryRatio: 95,
    shipments: [
      {
        id: "23485504",
        employee: "44",
        status: "Entregado",
        date: "25 Jul",
        state: "Descargado",
      },
      {
        id: "23485504",
        employee: "345",
        status: "Enviado",
        date: "02 Ago",
        state: "Descargado",
      },
      {
        id: "23485504",
        employee: "94",
        status: "Enviado",
        date: "22 Jul",
        state: "Descargado",
      },
      {
        id: "23485504",
        employee: "435",
        status: "En preparación",
        date: "28 Jul",
        state: "Descargado",
      },
    ],
  }

  return NextResponse.json(officeShipments)
}
