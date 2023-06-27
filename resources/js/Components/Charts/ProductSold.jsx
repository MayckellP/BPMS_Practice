import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "left",
            labels: {
                color: "Black",
                font: {
                    size: 20,
                },
                padding: 10,
            },
        },
    },
};

export function ProductSold(props) {
    return (
        <Doughnut
            options={options}
            data={props.data}
            className="chartEmployee"
        />
    );
}
