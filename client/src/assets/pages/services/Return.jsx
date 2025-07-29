import React, { useEffect, useState } from "react";

const Return = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8090/api/returnanalysis")
      .then((res) => res.json())
      .then((data) => {
        setReturns(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Return Analysis</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">SKU</th>
              <th className="px-4 py-2 border">Return Count</th>
              <th className="px-4 py-2 border">Return Rate</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((ret) => (
              <tr key={ret._id}>
                <td className="border px-4 py-2">{ret.sku}</td>
                <td className="border px-4 py-2">{ret.returnCount}</td>
                <td className="border px-4 py-2">{ret.returnRate}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Return;