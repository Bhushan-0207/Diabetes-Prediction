import { useEffect, useState } from "react";
import { getHistory } from "../services/api";

function History({ token }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHistory(token);
        setHistory(res.data);
      } catch (err) {
        console.log(err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <p className="text-center mt-10">Loading history...</p>;
  }

  return (
    <div className="bg-gray-100 max-w-xl mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Prediction History</h2>

      {history.length === 0 ? (
        <p className="text-center text-gray-500">No history available</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Prediction</th>
              <th className="border p-2">Probability</th>
            </tr>
          </thead>

          <tbody>
            {history
              .filter((item) => item.result)
              .map((item, i) => (
                <tr key={i} className="text-center">
                  <td
                    className={`border p-2 font-semibold ${
                      item.result.prediction
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.result.prediction ? "Diabetic" : "Normal"}
                  </td>

                  <td className="border p-2">
                    {(item.result.probability * 100).toFixed(2)}%
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default History;