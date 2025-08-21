import { NextResponse } from "next/server"

export async function GET() {
  const topProducts = [
    {
      id: 1,
      name: "Vino Blanco Seco Castilla Navarra",
      units: "234 uds",
      price: "€1",
      color: "#f1c05b",
    },
    {
      id: 2,
      name: "Vino Blanco El Pulpo 500 Rias Baixas",
      units: "234 uds",
      price: "€115",
      color: "#bf0000",
    },
    {
      id: 3,
      name: "Esparragos Proyecto Escuela Tarro",
      units: "234 uds",
      price: "€35",
      color: "#f1c05b",
    },
    {
      id: 4,
      name: "Paté de Campaña Ecológico...",
      units: "1.544 uds",
      price: "€50",
      color: "#f1c05b",
    },
    {
      id: 5,
      name: "12 sobres Wok Plate Raciones de Ar...",
      units: "234 uds",
      price: "€75",
      color: "#f1c05b",
    },
  ]

  return NextResponse.json(topProducts)
}
