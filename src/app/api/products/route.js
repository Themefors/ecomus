import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

// 📌 Get all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecomus");

    const products = await db.collection("products").find().toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 📌 Create new product
export async function POST(req) {
  try {
    const client = await clientPromise;
    const db = client.db("ecomus");

    const body = await req.json();
    const result = await db.collection("products").insertOne(body);

    return new Response(JSON.stringify({ message: "Product added", product: result }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 📌 Update product
export async function PUT(req) {
  try {
    const client = await clientPromise;
    const db = client.db("ecomus");

    const { id, ...updateData } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return new Response(JSON.stringify({ message: "Product updated", result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 📌 Delete product
export async function DELETE(req) {
  try {
    const client = await clientPromise;
    const db = client.db("ecomus");

    const { id } = await req.json();
    if (!id) {
      return new Response(JSON.stringify({ error: "Product ID required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: "Product deleted", result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
