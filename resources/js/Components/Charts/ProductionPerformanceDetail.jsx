import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    scales: {
        y: {
            max: 20000, // Establece el valor máximo del eje y
            beginAtZero: true, // Comienza el eje y desde cero
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: "top",
        },
        title: {
            display: true,
            color: "Black",
        },
    },
};

export function ProductionPerformanceDetail(props) {
    return <Line options={options} data={props.dataBar} />;
}
