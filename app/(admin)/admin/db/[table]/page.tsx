"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TablePage() {
  const params = useParams();
  const table = (params?.table as string) || "";

  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!table) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/db/${table}`);

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const json = await res.json();

        const data = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
            ? json.data
            : [];

        setRows(data);
      } catch (err: any) {
        setError(err.message);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [table]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold capitalize">{table}</h1>

        <Link
          href={`/admin/db/${table}/new`}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          + Add
        </Link>
      </div>

      {loading && <div className="text-gray-500">Loading...</div>}

      {error && <div className="text-red-500">Error: {error}</div>}

      {!loading && rows.length === 0 && !error && (
        <div className="text-gray-500">No data found</div>
      )}

      <div className="bg-white shadow rounded">
        {rows.map((row: any) => (
          <div key={row.id} className="p-3 border-b hover:bg-gray-50">
            <Link href={`/admin/db/${table}/${row.id}/edit`}>
              {Object.entries(row).map(([k, v]) => (
                <div key={k}>
                  <b>{k}:</b> {String(v)}
                </div>
              ))}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";

// const models: any = {
//   products: prisma.product,
//   users: prisma.user,
//   categories: prisma.category,
//   orders: prisma.order,
// };

// export async function GET(req: Request, { params }: any) {
//   const model = models[params.table];

//   if (!model) {
//     return NextResponse.json({ error: "Table not found" }, { status: 404 });
//   }

//   const data = await model.findMany();

//   return NextResponse.json(data);
// }

// // "use client";

// // import { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import Link from "next/link";

// // export default function TablePage() {
// //   const params = useParams();
// //   const table = (params?.table as string) || "";

// //   const [rows, setRows] = useState<any[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     if (!table) return;

// //     const load = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         const res = await fetch(`/api/db/${table}`);

// //         if (!res.ok) {
// //           throw new Error(`API error: ${res.status}`);
// //         }

// //         const json = await res.json();

// //         console.log("API RESPONSE:", json);

// //         // 🔥 гарантуємо масив
// //         const data = Array.isArray(json)
// //           ? json
// //           : Array.isArray(json?.data)
// //             ? json.data
// //             : [];

// //         setRows(data);
// //       } catch (err: any) {
// //         setError(err.message || "Unknown error");
// //         setRows([]);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     load();
// //   }, [table]);

// //   return (
// //     <div className="p-4">
// //       {/* HEADER */}
// //       <div className="flex justify-between items-center mb-4">
// //         <h1 className="text-xl font-bold capitalize">{table}</h1>

// //         <Link
// //           href={`/admin/db/${table}/new`}
// //           className="bg-blue-600 text-white px-3 py-2 rounded"
// //         >
// //           + Add
// //         </Link>
// //       </div>

// //       {/* LOADING */}
// //       {loading && <div className="text-gray-500">Loading...</div>}

// //       {/* ERROR */}
// //       {error && <div className="text-red-500">Error: {error}</div>}

// //       {/* EMPTY */}
// //       {!loading && rows.length === 0 && !error && (
// //         <div className="text-gray-500">No data found</div>
// //       )}

// //       {/* TABLE */}
// //       <div className="bg-white shadow rounded">
// //         {rows.map((row: any) => (
// //           <div key={row.id} className="p-3 border-b hover:bg-gray-50">
// //             <Link href={`/admin/db/${table}/${row.id}/edit`} className="block">
// //               {Object.entries(row).map(([key, value]) => (
// //                 <div key={key}>
// //                   <b>{key}:</b> {String(value)}
// //                 </div>
// //               ))}
// //             </Link>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import { useParams } from "next/navigation";
// // // import Link from "next/link";

// // // export default function TablePage() {
// // //   const params = useParams();
// // //   const table = params.table as string;

// // //   const [rows, setRows] = useState([]);

// // //   useEffect(() => {
// // //     if (!table) return;

// // //     fetch(`/api/db/${table}`)
// // //       .then((res) => res.json())
// // //       .then(setRows);
// // //   }, [table]);

// // //   return (
// // //     <div>
// // //       <div className="flex justify-between mb-4">
// // //         <h1 className="text-xl font-bold">{table}</h1>

// // //         <Link
// // //           href={`/admin/db/${table}/new`}
// // //           className="bg-blue-600 text-white px-3 py-2 rounded"
// // //         >
// // //           + Add
// // //         </Link>
// // //       </div>

// // //       <div className="bg-white shadow rounded">
// // //         {rows?.map((row: any) => (
// // //           <div key={row.id} className="p-3 border-b">
// // //             {Object.entries(row).map(([k, v]) => (
// // //               <div key={k}>
// // //                 <b>{k}:</b> {String(v)}
// // //               </div>
// // //             ))}
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // // "use client";

// // // // import { useEffect, useState } from "react";
// // // // import Link from "next/link";

// // // // export default function TablePage({ params }: { params: { table: string } }) {
// // // //   const table = params.table; // ✅ витягуємо ОДИН раз

// // // //   const [rows, setRows] = useState([]);

// // // //   useEffect(() => {
// // // //     fetch(`/api/db/${table}`)
// // // //       .then((res) => res.json())
// // // //       .then(setRows);
// // // //   }, [table]); // ✅ НЕ params.table

// // // //   return (
// // // //     <div>
// // // //       <div className="flex justify-between mb-4">
// // // //         <h1 className="text-xl font-bold">{table}</h1>

// // // //         <Link
// // // //           href={`/admin/db/${table}/new`}
// // // //           className="bg-blue-600 text-white px-3 py-2 rounded"
// // // //         >
// // // //           + Add
// // // //         </Link>
// // // //       </div>

// // // //       <div className="bg-white shadow rounded">
// // // //         {rows?.map((row: any) => (
// // // //           <div key={row.id} className="p-3 border-b hover:bg-gray-50">
// // // //             {Object.entries(row).map(([k, v]) => (
// // // //               <div key={k}>
// // // //                 <b>{k}:</b> {String(v)}
// // // //               </div>
// // // //             ))}
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // // // "use client";

// // // // // import { useEffect, useState } from "react";
// // // // // import Link from "next/link";

// // // // // export default function TablePage({ params }: { params: { table: string } }) {
// // // // //   const [rows, setRows] = useState([]);

// // // // //   useEffect(() => {
// // // // //     fetch(`/api/db/${params.table}`)
// // // // //       .then((res) => res.json())
// // // // //       .then(setRows);
// // // // //   }, [params.table]);

// // // // //   return (
// // // // //     <div>
// // // // //       <div className="flex justify-between mb-4">
// // // // //         <h1 className="text-xl font-bold">{params.table}</h1>

// // // // //         <Link
// // // // //           href={`/admin/db/${params.table}/new`}
// // // // //           className="bg-blue-600 text-white px-3 py-2 rounded"
// // // // //         >
// // // // //           + Add
// // // // //         </Link>
// // // // //       </div>

// // // // //       <div className="bg-white shadow rounded">
// // // // //         {rows.map((row: any) => (
// // // // //           <div key={row.id} className="p-3 border-b hover:bg-gray-50">
// // // // //             {Object.entries(row).map(([key, value]) => (
// // // // //               <div key={key}>
// // // // //                 <b>{key}:</b> {String(value)}
// // // // //               </div>
// // // // //             ))}
// // // // //           </div>
// // // // //         ))}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
