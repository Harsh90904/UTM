// src/pages/Home.jsx
import React from "react";

const Home = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Welcome to UTM Dashboard
      </h2>

      <div className="flex flex-wrap gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
          <h4 className="text-gray-600 mb-2 text-base font-semibold">
            Total Sales
          </h4>
          <p className="text-2xl text-blue-600 font-bold">₹2,50,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
          <h4 className="text-gray-600 mb-2 text-base font-semibold">
            Delivered Orders
          </h4>
          <p className="text-2xl text-blue-600 font-bold">1800</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
          <h4 className="text-gray-600 mb-2 text-base font-semibold">
            Returned Orders
          </h4>
          <p className="text-2xl text-blue-600 font-bold">150</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
          <h4 className="text-gray-600 mb-2 text-base font-semibold">
            RTO Orders
          </h4>
          <p className="text-2xl text-blue-600 font-bold">50</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow flex-1 min-w-[200px]">
          <h4 className="text-gray-600 mb-2 text-base font-semibold">
            TDS Deducted
          </h4>
          <p className="text-2xl text-blue-600 font-bold">₹25,000</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-2">Sales vs Returns</h4>
          <div className="text-gray-400">[Insert Chart Here]</div>
        </div>
      </div>

      <div className="mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-4">Top Performing SKUs</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-4 py-2 text-left">Product</th>
                  <th className="bg-gray-100 px-4 py-2 text-left">Seller</th>
                  <th className="bg-gray-100 px-4 py-2 text-left">Platform</th>
                  <th className="bg-gray-100 px-4 py-2 text-left">Sales</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2">Product A</td>
                  <td className="border-b px-4 py-2">Seller A</td>
                  <td className="border-b px-4 py-2">Amazon</td>
                  <td className="border-b px-4 py-2">₹25,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-semibold mb-4">High-RTO Products</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gray-100 px-4 py-2 text-left">Product</th>
                  <th className="bg-gray-100 px-4 py-2 text-left">Issue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2">Product X</td>
                  <td className="border-b px-4 py-2">Damaged Returns</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
