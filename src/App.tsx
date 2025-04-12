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
      label: "Riemann-Siegel Formula",
      data: [], // scatter expects [{ x, y }]
      borderColor: "rgb(255, 176, 58)",
      borderWidth: 2.2,
      showLine: true, // optional: disables connecting lines
      lineWidth: 0.2,
      tension: 0.2,
      pointRadius: 0,
    },
  ],
};

export const options = {
  maintainAspectRatio: false,
  scales: {
    x: {
      display: true,
      min: -3,
      max: 8,
      grid: {
        color: (ctx: any) =>
          ctx.tick.value === 0
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(172, 171, 171, 0.2)", // Darker line at x = 0
        lineWidth: (ctx: any) => (ctx.tick.value === 0 ? 1 : 1),
      },
    },
    y: {
      grid: {
        color: (ctx: any) =>
          ctx.tick.value === 0
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(172, 171, 171, 0.2)", // Darker line at x = 0
        lineWidth: (ctx: any) => (ctx.tick.value === 0 ? 1 : 1),
      },
      min: -6,
      max: 6,
    },
  },
};

let t = 0.13;
const step = 0.1;
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
      const output = riemann.ZComplex(t);
      const x = output.re;
      const y = output.im;
      addPoint(x, y);
      console.log("input: ", t, "output: ", output);

      t += step;
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      testing
      <div style={{ width: "800px", height: "800px" }}>
        <Scatter ref={graphRef} options={options} data={data} />;
      </div>
    </div>
  );
}

export default App;
