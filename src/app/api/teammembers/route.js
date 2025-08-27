import clientPromise from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ==========================
// GET -> সব team members
// ==========================
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("teachfosys");
    const members = await db.collection("TeamMembers").find({}).toArray();

    return new Response(JSON.stringify({ success: true, data: members }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

// ==========================
// POST -> নতুন team member add
// ==========================
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, designation, image, public_id } = body;

    if (!name || !designation || !image || !public_id) {
      return new Response(JSON.stringify({ success: false, message: "All fields required!" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("teachfosys");

    const result = await db.collection("TeamMembers").insertOne({
      name,
      designation,
      image,
      public_id,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, data: result }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

// ==========================
// DELETE -> remove member
// ==========================
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ success: false, message: "ID required!" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("teachfosys");

    const member = await db.collection("TeamMembers").findOne({ _id: new ObjectId(id) });
    if (!member) {
      return new Response(JSON.stringify({ success: false, message: "Member not found" }), { status: 404 });
    }

    // Cloudinary থেকে delete
    if (member.public_id) {
      await cloudinary.uploader.destroy(member.public_id);
    }

    // MongoDB থেকে delete
    await db.collection("TeamMembers").deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: true, message: "Deleted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}

// ==========================
// PUT -> update member
// ==========================
export async function PUT(req) {
  try {
    const { id, name, designation, image, public_id } = await req.json();

    if (!id || !name || !designation) {
      return new Response(JSON.stringify({ success: false, message: "ID, name, and designation required!" }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("teachfosys");

    const member = await db.collection("TeamMembers").findOne({ _id: new ObjectId(id) });
    if (!member) {
      return new Response(JSON.stringify({ success: false, message: "Member not found" }), { status: 404 });
    }

    // যদি নতুন image থাকে → পুরানো image delete করবো
    if (image && public_id) {
      if (member.public_id) {
        await cloudinary.uploader.destroy(member.public_id);
      }
    }

    const updated = await db.collection("TeamMembers").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          designation,
          image: image || member.image,
          public_id: public_id || member.public_id,
        },
      }
    );

    return new Response(JSON.stringify({ success: true, data: updated }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
