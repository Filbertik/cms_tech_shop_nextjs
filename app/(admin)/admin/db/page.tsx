import Link from "next/link";

const tables = ["products", "users", "categories", "orders"];

export default function DbHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Database Viewer</h1>

      <div className="grid grid-cols-2 gap-4">
        {tables.map((table) => (
          <Link
            key={table}
            href={`/admin/db/${table}`}
            className="p-4 bg-white shadow rounded hover:bg-gray-50"
          >
            {table}
          </Link>
        ))}
      </div>
    </div>
  );
}
