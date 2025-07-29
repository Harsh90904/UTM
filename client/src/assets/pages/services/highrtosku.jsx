import React, { useEffect, useState } from "react";

const HighRTOSKU = () => {
  const [skus, setSkus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8090/api/returnanalysis")
      .then((res) => res.json())
      .then((data) => {
        // Example: show SKUs with returnRate > 10%
        setSkus(data.filter((sku) => sku.returnRate > 10));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">High RTO SKUs</h2>
      {loading ? (
        <div>Loading...</div>
      ) : skus.length === 0 ? (
        <p className="text-gray-600">No high RTO SKUs found.</p>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">SKU</th>
              <th className="px-4 py-2 border">Return Rate</th>
              <th className="px-4 py-2 border">Refund Impact</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku) => (
              <tr key={sku._id}>
                <td className="border px-4 py-2">{sku.sku}</td>
                <td className="border px-4 py-2">{sku.returnRate}%</td>
                <td className="border px-4 py-2">{sku.refundImpact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HighRTOSKU;