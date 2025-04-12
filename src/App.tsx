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
import { round } from "mathjs";
import * as riemann from "./utils/riemann";

let t = 0.13;
const step = 0.1;

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
      data: [],
      borderColor: "rgb(255, 176, 58)",
      backgroundColor: "rgb(255, 176, 58)",
      borderWidth: 2.2,
      showLine: true,
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
      title: {
        display: true,
        text: "Real ", // ⬅️ your custom y-axis title
        font: {
          weight: 600,
          size: 14,
        },
      },
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
      title: {
        display: true,
        text: "Imaginary (t)", // ⬅️ your custom y-axis title
        font: {
          weight: 600,
          size: 14,
        },
      },
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
  plugins: {
    title: {
      display: true,
      text: "Approximating Z(T) on the Critical Line",
      font: {
        weight: 600, // 👈 Makes the title bold
        size: 18, // (optional) You can set size too
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    legend: {
      labels: {
        font: {
          weight: 400,
          size: 14,
        },
        color: "#474747", // Optional: legend text color
      },
    },
  },
};

function App() {
  const graphRef = useRef(null);
  const [tView, setTView] = useState(t);

  // Function to dynamically add a point
  const addPoint = (x: number, y: number) => {
    const chart: any = graphRef.current;
    if (!chart) return;

    chart.data.labels!.push(x);
    chart.data.datasets[0].data.push({ x, y });

    chart.update("none"); // no animation
  };

  // Example: add a point every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      const output = riemann.ZComplex(t);
      const x = output.re;
      const y = output.im;
      addPoint(x, y);

      t += step;
      t = round(t, 1);
      setTView(t);
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header style={{ textAlign: "left" }}>Albany Patriawan</header>
      <div
        style={{
          width: "800px",
          height: "800px",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Scatter ref={graphRef} options={options} data={data} />;
        <span
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {" "}
          <span>t=</span>
          {tView}
        </span>
      </div>
    </div>
  );
}

export default App;
