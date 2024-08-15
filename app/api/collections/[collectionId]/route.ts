import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    await connectToDB();

    const collection = await Collection.findById(params.collectionId).populate({
      path: "products",
      model: Product,
    });

    if (!collection) {
      return new NextResponse(
        JSON.stringify({ message: "Collection not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// crear el DELETE y ver el tema de operadores de mongo $

export const dynamic = "force-dynamic";
