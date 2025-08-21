import { type NextRequest, NextResponse } from "next/server"

// Mock cart data for employee
const getEmployeeCart = (employeeId: string) => {
  return {
    employeeId,
    items: [
      {
        id: 1,
        name: "Vino Blanco Seco Canals Nubiola",
        description: "75 cl",
        image: "/white-wine-bottle.png",
        lot: "Lote tradicional",
        status: "Seleccionado",
        quantity: "1 ud",
        price: 35,
        hasAlert: false,
      },
      {
        id: 2,
        name: "Vino Blanco El Pulpo (DO Rías Baixas)",
        description: "75 cl",
        image: "/white-wine-bottle.png",
        lot: "Lote tradicional",
        status: "Por defecto",
        quantity: "2 uds",
        price: 115,
        hasAlert: true,
      },
      {
        id: 3,
        name: "Espumoso Prosetto Rosado Seco",
        description: "75 cl",
        image: "/prosecco-bottle.png",
        lot: "Lote tradicional",
        status: "Por defecto",
        quantity: "1 ud",
        price: 35,
        hasAlert: false,
      },
      {
        id: 4,
        name: "Paté de Campagne Ecológico",
        description: "100 gr",
        image: "/pate-jar.png",
        lot: "Lote tradicional",
        status: "Por defecto",
        quantity: "1 ud",
        price: 35,
        hasAlert: false,
      },
      {
        id: 5,
        name: "12 sobres 100gr Plato Redondo de Jamón Cabo 50% Ibérico",
        description: "1.2 kg",
        image: "/placeholder-huz4w.png",
        lot: "Lote tradicional",
        status: "Por defecto",
        quantity: "2 uds",
        price: 775,
        hasAlert: true,
      },
    ],
    summary: {
      cartStatus: "Enviado",
      totalTokens: 1500,
      usedTokens: 1500,
      extraTokens: 350,
      closureDate: "22 Noviembre 2025",
      totalItems: 15,
    },
  }
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const cartData = getEmployeeCart(id)
  return NextResponse.json(cartData)
}
