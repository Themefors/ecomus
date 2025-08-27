import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================
// GET -> সব Subsidiaries দেখাবে
// ==========================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("teachfosys");
    const subsidiaries = await db.collection("Subsidiaries").find({}).toArray();

    return new Response(JSON.stringify({ success: true, data: subsidiaries }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

// ==========================
// POST -> Subsidiary add করবে
// ==========================
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, image, public_id } = body;

    if (!name || !description || !image || !public_id) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required!" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("teachfosys");

    const result = await db.collection("Subsidiaries").insertOne({
      name,
      description,
      image, // secure_url
      public_id, // Cloudinary public_id
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, data: result }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

// ==========================
// DELETE -> MongoDB + Cloudinary থেকে delete
// ==========================
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "ID required!" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("teachfosys");

    const subsidiary = await db
      .collection("Subsidiaries")
      .findOne({ _id: new ObjectId(id) });

    if (!subsidiary) {
      return new Response(
        JSON.stringify({ success: false, message: "Subsidiary not found" }),
        { status: 404 }
      );
    }

    // Cloudinary delete
    if (subsidiary.public_id) {
      await cloudinary.uploader.destroy(subsidiary.public_id);
    }

    // MongoDB delete
    await db.collection("Subsidiaries").deleteOne({ _id: new ObjectId(id) });

    return new Response(
      JSON.stringify({ success: true, message: "Deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
