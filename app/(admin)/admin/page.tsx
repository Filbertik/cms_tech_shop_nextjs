export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Products</p>
          <h2 className="text-xl font-bold">124</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Orders</p>
          <h2 className="text-xl font-bold">38</h2>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <p className="text-gray-500">Users</p>
          <h2 className="text-xl font-bold">12</h2>
        </div>
      </div>
    </div>
  );
}
