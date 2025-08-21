import { NextResponse } from "next/server"

export async function GET() {
  const categories = [
    { name: "Cajas almorzeras", percentage: 38, color: "#bf0000" },
    { name: "Lotes", percentage: 31, color: "#f1c05b" },
    { name: "Gourmet", percentage: 24, color: "#2e9858" },
    { name: "Vinos", percentage: 15, color: "#4b5675" },
    { name: "Chocolates", percentage: 11, color: "#bfb7f0" },
  ]

  return NextResponse.json(categories)
}
