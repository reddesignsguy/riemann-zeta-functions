import "./App.css";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Scatter } from "react-chartjs-2";
import { zeta, complex, Complex, round } from "mathjs";
import * as riemann from "./utils/riemann";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ...registerables
);

export let data = {
  datasets: [
    {
      label: "Dataset 1",
      data: [], // scatter expects [{ x, y }]
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      showLine: true, // optional: disables connecting lines
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};

export const options = {
  scales: {
    x: {
      beginAtZero: true,
      min: -10,
      max: 10,
    },
    y: {
      beginAtZero: true,
      min: -10,
      max: 10,
    },
  },
};

console.log(riemann.Z(21.02204));
let t = 0;
const step = 0.3;
function App() {
  const graphRef = useRef(null);

  // Function to dynamically add a point
  const addPoint = (x: number, y: number) => {
    const chart: any = graphRef.current;
    if (!chart) return;

    chart.data.labels!.push(x);
    chart.data.datasets[0].data.push({ x, y });

    // Limit number of points shown (optional)
    // if (chart.data.labels!.length > 1000) {
    //   chart.data.labels!.shift();
    //   chart.data.datasets[0].data.shift();
    // }

    chart.update("none"); // no animation
  };

  // Example: add a point every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      const input: Complex = complex(0.5, t);
      console.log(input);
      const output = zeta(input);
      const x = output.re;
      const y = output.im;
      addPoint(x, y);
      console.log(output);

      t = -64;
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      testing
      <div style={{ width: "100vh", height: "100vh" }}>
        <Scatter ref={graphRef} options={options} data={data} />;
      </div>
    </div>
  );
}

export default App;
