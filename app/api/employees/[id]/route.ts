import { type NextRequest, NextResponse } from "next/server"

// Mock employee detail data
const getEmployeeDetail = (id: string) => {
  return {
    employeeId: id,
    name: "Carlos Martinez",
    email: "carlos.martinez@gmail.com",
    phone: "012345678",
    externalId: "123456789",
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const employeeDetail = getEmployeeDetail(params.id)

  return NextResponse.json(employeeDetail)
}
