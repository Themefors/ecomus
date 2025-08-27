import clientPromise from "@/lib/dbConnect";

export async function GET() {
  try {
    const client = await clientPromise; // Promise await করা
    const db = client.db("teachfosys"); // Database select
    const collections = await db.listCollections().toArray(); // Collections fetch

    console.log("MongoDB connected successfully!");
    return new Response(JSON.stringify({ message: "MongoDB Connected!", collections }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    return new Response(JSON.stringify({ message: "Failed!", error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}