"use client";

import { useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  stock: number;
  slug?: string;
  images?: { url: string }[];
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  const load = async () => {
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                {p.images?.[0]?.url && (
                  <img src={p.images[0].url} className="w-12 h-12" />
                )}
              </td>

              <td>{p.title}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>

              <td>
                <button
                  onClick={() => setEditId(p.id)}
                  className="bg-black text-white px-3 py-1"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
