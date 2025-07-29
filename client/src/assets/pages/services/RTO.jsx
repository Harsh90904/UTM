import React, { useEffect, useState } from "react";

const RTO = () => {
  const [rtoOrders, setRtoOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8090/api/order")
      .then((res) => res.json())
      .then((orders) => {
        setRtoOrders(orders.filter((o) => o.status === "RTO"));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">RTO Orders</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Order ID</th>
              <th className="px-4 py-2 border">Seller</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {rtoOrders.map((order) => (
              <tr key={order._id}>
                <td className="border px-4 py-2">{order.orderId}</td>
                <td className="border px-4 py-2">
                  {order.sellerID?.name || order.sellerID}
                </td>
                <td className="border px-4 py-2">{order.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RTO;
