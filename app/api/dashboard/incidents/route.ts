import { NextResponse } from "next/server"

export async function GET() {
  const incidents = {
    incidentRatio: 2,
    details: {
      brokenProducts: 145,
      missingProducts: 145,
      wrongProducts: 145,
      outOfStock: 145,
    },
  }

  return NextResponse.json(incidents)
}
