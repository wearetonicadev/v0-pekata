import { NextResponse } from "next/server"

export async function GET() {
  const surveyResults = {
    totalSurveyed: 54,
    nps: 40,
    averageScore: 8.5,
    segments: [
      { name: "Promotores", count: 210, percentage: 85.5, color: "#2e9858" },
      { name: "Pasivos", count: 73, percentage: null, color: "#f1c05b" },
      { name: "Detractores", count: 40, percentage: 10.4, color: "#bf0000" },
    ],
  }

  return NextResponse.json(surveyResults)
}
