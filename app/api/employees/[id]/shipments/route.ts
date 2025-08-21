import { type NextRequest, NextResponse } from "next/server"

// Mock shipments data for employee
const getEmployeeShipments = (employeeId: string) => {
  return {
    employeeId,
    shipments: [
      {
        id: "HJ439834743439",
        name: "Envío 1",
        carrier: "DHL",
        status: "Entregado",
        statusDate: "16 Agosto 2025",
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
          },
        ],
        timeline: [
          {
            status: "Envío 1 ha salido del almacén",
            date: "14 Agosto 2025 - 16:45 pm",
          },
          {
            status: "Envío 1 ha llegado a la aduana",
            date: "15 Agosto 2025 - 09:30 am",
          },
          {
            status: "Envío 1 en proceso de entrega",
            date: "15 Agosto 2025 - 12:00 pm",
          },
          {
            status: "Envío 1 ha sido entregado al destinatario",
            date: "16 Agosto 2025 - 10:15 am",
          },
        ],
      },
      {
        id: "HJ439834743439",
        name: "Envío 2",
        carrier: "DHL",
        status: "Enviado",
        statusDate: "22 Agosto 2025",
        items: [],
        timeline: [
          {
            status: "Envío 2 ha salido del almacén",
            date: "22 Agosto 2025 - 14:30 pm",
          },
          {
            status: "Envío 2 en tránsito",
            date: "22 Agosto 2025 - 18:45 pm",
          },
        ],
      },
    ],
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const shipmentsData = getEmployeeShipments(params.id)
  return NextResponse.json(shipmentsData)
}
