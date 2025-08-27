"use client";
import { useEffect, useState } from "react";

const SubsidiariesTable = () => {
  const [subsidiaries, setSubsidiaries] = useState([]);

  const fetchData = async () => {
    const res = await fetch("/api/subsidiaries");
    const data = await res.json();
    if (res.ok) setSubsidiaries(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this company?")) return;

    const res = await fetch("/api/subsidiaries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Deleted successfully");
      fetchData();
    } else {
      alert(data.message || "Delete failed");
    }
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">All Companies</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {subsidiaries.map((sub) => (
            <tr key={sub._id}>
              <td className="border p-2">{sub.name}</td>
              <td className="border p-2">{sub.description}</td>
              <td className="border p-2">
                <img src={sub.image} alt={sub.name} className="w-20 h-20 object-contain" />
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubsidiariesTable;
