import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();
    // populate
    // devolver un detalle de un modelo con sus propiedades + el detalle de campos de los docs. referenciados
    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    // puede que necesite agregar algo para más adelante
    return new NextResponse(JSON.stringify(product), {
      status: 200,
    });
  } catch (err) {
    console.log("[product_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    await Product.findByIdAndDelete(product._id);

    await Promise.all(
      product.collections.map((collectionId: string) => {
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        });
      })
    );

    return new NextResponse(JSON.stringify({ message: "Product deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[productId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

// pendiente una transacción compleja
export const dynamic = "force-dynamic";
