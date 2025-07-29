import React, { useEffect, useState } from "react";

const TDSClauter = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8090/api/tdsrecord")
      .then((res) => res.json())
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">TDS Records</h2>
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
            {records.map((rec) => (
              <tr key={rec._id}>
                <td className="border px-4 py-2">{rec.orderId}</td>
                <td className="border px-4 py-2">{rec.sellerId}</td>
                <td className="border px-4 py-2">{rec.tdsAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TDSClauter;
