"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const res = await fetch(
      `/api/products?page=${page}&limit=10&search=${search}`,
    );

    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>

        <Link
          href="/admin/products/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      {/* SEARCH */}
      <input
        className="border p-2 w-full mb-4"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        {data?.data?.map((p: any) => (
          <div key={p.id} className="flex justify-between p-3 border-b">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-500">{p.price} $</p>
            </div>

            <Link
              href={`/admin/products/${p.id}/edit`}
              className="text-blue-600"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          {page} / {data?.totalPages || 1}
        </span>

        <button
          disabled={page === data?.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// export default function AdminProductsPage() {
//   return (
//     <div style={{padding:20}}>
//       <h1>Admin Products</h1>
//     </div>
//   );
// }
