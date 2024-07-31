// /api/create-chat.ts

import { loadS3IntoPinecone } from "@/lib/db/pinecone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileKey, fileName } = body;
    
    console.log("Received fileKey:", fileKey);
    console.log("Received fileName:", fileName);
    
    const pages = await loadS3IntoPinecone(fileKey);
    
    return NextResponse.json({ pages });
  } catch (error) {
    console.error("Error in /api/create-chat:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
