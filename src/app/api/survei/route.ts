import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// SIMPAN DATA (POST)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const savedData = await prisma.responden.create({ data: body });
    return NextResponse.json({ success: true, data: savedData }, { status: 201 });
  } catch (error) {
    console.error("Gagal simpan:", error);
    return NextResponse.json({ success: false, error: "Database Error" }, { status: 500 });
  }
}

// AMBIL DATA (GET)
export async function GET() {
  try {
    const allData = await prisma.responden.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: allData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Gagal ambil data" }, { status: 500 });
  }
}