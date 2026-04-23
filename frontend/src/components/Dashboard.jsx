import { useState } from "react";
import { predict } from "../services/api";

function Dashboard({ token }) {
  const [form, setForm] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });
  const userName = localStorage.getItem("name");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors,setErrors] = useState({});

  const handleSubmit = async () => {
    for (let key in form) {
      if (form[key] === "") {
        alert("Please fill all fields");
        return;
      }
    }

    try {
      setLoading(true);

      const formattedData = Object.fromEntries(
        Object.entries(form).map(([k, v]) => [k, Number(v)]),
      );

      const res = await predict(formattedData, token);

      setResult(res.data);
    } catch (err) {
      console.log(err.response?.data);
      alert("Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 max-w-xl mx-auto mt-6 p-5 border rounded shadow">
      <h2 className="text-center text-gray-600 mb-1">
        Welcome, <span className="font-semibold">{userName}</span> 👋
      </h2>

      <h1 className="text-xl font-bold mb-3 text-center">
        Diabetes Prediction
      </h1>

      
      {Object.keys(form).map((key) => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-medium mb-1">
            {key === "DiabetesPedigreeFunction"
              ? "Diabetes Pedigree Function"
              : key}
          </label>

          <input
            placeholder={`Enter ${key}`}
            value={form[key]}
            onChange={(e) => {
              const value =  e.target.value 
              if(/^\d*\.?\d*$/.test(value)){
                setForm({...form,[key]:value});
                setErrors({...errors,[key]:false})
              }
              else{
                setErrors({...errors,[key]:true})
              }
            }}
            className= "border p-1 rounded "
          />
        </div>
      ))}

      
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 w-full mt-4 rounded hover:bg-blue-600"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div className="mt-5 text-center">
          <h2
            className={
              result.prediction
                ? "text-red-500 font-bold text-lg"
                : "text-green-500 font-bold text-lg"
            }
          >
            {result.prediction ? "⚠️ Diabetic" : "✅ Not Diabetic"}
          </h2>

          <p className="mt-2 text-gray-600">
            Probability: {(result.probability * 100).toFixed(2)}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
