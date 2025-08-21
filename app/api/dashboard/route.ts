import { NextResponse } from "next/server"

export async function GET() {
  // Mock data for all dashboard components
  const dashboardData = {
    metrics: {
      totalLines: 1456,
      selectedLines: { value: 1456, percentage: 45 },
      selectedLinesSecond: { value: 1456, percentage: 45 },
      employees: 213,
      authorizedOrders: 1456,
      totalAmount: "4.567€",
    },
    categories: [
      { name: "Vinos", percentage: 35, color: "#1b84ff" },
      { name: "Licores", percentage: 25, color: "#2e9858" },
      { name: "Champagne", percentage: 20, color: "#f59e0b" },
      { name: "Otros", percentage: 20, color: "#ef4444" },
    ],
    topProducts: [
      { id: 1, name: "Prosecco", units: "150 uds", price: "12.50€", color: "#1b84ff" },
      { id: 2, name: "Vino Tinto", units: "120 uds", price: "18.75€", color: "#2e9858" },
      { id: 3, name: "Vino Blanco", units: "95 uds", price: "15.30€", color: "#f59e0b" },
      { id: 4, name: "Champagne", units: "80 uds", price: "25.00€", color: "#ef4444" },
      { id: 5, name: "Licor de Hierbas", units: "65 uds", price: "22.50€", color: "#8b5cf6" },
    ],
    pendingRequests: {
      productChange: { count: 23, label: "empleados" },
      attentionDeadline: { count: 15, label: "empleados" },
    },
    officeShipments: {
      deliveryRatio: 87,
      shipments: [
        { id: "ORD-001", employee: "Carlos Martínez", status: "Enviado", date: "15-dic-2023", state: "Entregado" },
        { id: "ORD-002", employee: "Laura Pérez", status: "Enviado", date: "14-dic-2023", state: "En tránsito" },
        { id: "ORD-003", employee: "Javier Fernández", status: "Preparado", date: "13-dic-2023", state: "Pendiente" },
        { id: "ORD-004", employee: "Ana Gómez", status: "Enviado", date: "12-dic-2023", state: "Entregado" },
        { id: "ORD-005", employee: "Sofía Ramírez", status: "Preparado", date: "11-dic-2023", state: "Pendiente" },
      ],
    },
    homeShipments: {
      totalLines: 892,
      statuses: [
        { name: "Entregado", count: 456, percentage: 51, color: "#2e9858" },
        { name: "En tránsito", count: 234, percentage: 26, color: "#1b84ff" },
        { name: "Pendiente", count: 156, percentage: 18, color: "#f59e0b" },
        { name: "Retrasado", count: 46, percentage: 5, color: "#ef4444" },
      ],
    },
    incidents: {
      incidentRatio: 12,
      details: {
        brokenProducts: 8,
        missingProducts: 15,
        wrongProducts: 12,
        outOfStock: 23,
      },
    },
    surveyResults: {
      totalSurveyed: 189,
      nps: 72,
      averageScore: 8.4,
      segments: [
        { name: "Muy Satisfecho", count: 89, percentage: 47, color: "#2e9858" },
        { name: "Satisfecho", count: 67, percentage: 35, color: "#1b84ff" },
        { name: "Neutral", count: 23, percentage: 12, color: "#f59e0b" },
        { name: "Insatisfecho", count: 10, percentage: 6, color: "#ef4444" },
      ],
    },
  }

  return NextResponse.json(dashboardData)
}
