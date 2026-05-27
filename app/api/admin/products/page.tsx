"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);

  // load products
  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleEdit = async (id: number) => {
    const res = await fetch(`/api/admin/products/${id}`);
    const data = await res.json();
    setEditing(data);
  };

  const handleSave = async () => {
    if (!editing) return;

    await fetch(`/api/admin/products/${editing.id}`, {
      method: "PATCH",
      body: JSON.stringify(editing),
    });

    // reload
    const res = await fetch("/api/admin/products");
    setProducts(await res.json());

    setEditing(null);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Products</h1>

      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          {p.title} — {p.price} грн
          <button onClick={() => handleEdit(p.id)}>Edit</button>
        </div>
      ))}

      {editing && (
        <div style={{ marginTop: 20 }}>
          <h2>Edit</h2>

          <input
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
          />

          <input
            value={editing.price}
            onChange={(e) =>
              setEditing({ ...editing, price: Number(e.target.value) })
            }
          />

          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

// "use client";

// import { useEffect, useState } from "react";

// type Product = {
//   id: string;
//   title: string;
//   price: number;
//   stock: number;
//   slug?: string;
//   images?: { url: string }[];
// };

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editId, setEditId] = useState<string | null>(null);

//   const load = async () => {
//     const res = await fetch("/api/admin/products");
//     const data = await res.json();
//     setProducts(data);
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th>Image</th>
//             <th>Title</th>
//             <th>Price</th>
//             <th>Stock</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((p) => (
//             <tr key={p.id}>
//               <td>
//                 {p.images?.[0]?.url && (
//                   <img src={p.images[0].url} className="w-12 h-12" />
//                 )}
//               </td>

//               <td>{p.title}</td>
//               <td>{p.price}</td>
//               <td>{p.stock}</td>

//               <td>
//                 <button
//                   onClick={() => setEditId(p.id)}
//                   className="bg-black text-white px-3 py-1"
//                 >
//                   Edit
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
