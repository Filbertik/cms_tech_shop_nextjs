"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TablePage({ params }: { params: { table: string } }) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`/api/db/${params.table}`)
      .then((res) => res.json())
      .then(setRows);
  }, [params.table]);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">{params.table}</h1>

        <Link
          href={`/admin/db/${params.table}/new`}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          + Add
        </Link>
      </div>

      <div className="bg-white shadow rounded">
        {rows.map((row: any) => (
          <div key={row.id} className="p-3 border-b hover:bg-gray-50">
            {Object.entries(row).map(([key, value]) => (
              <div key={key}>
                <b>{key}:</b> {String(value)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
