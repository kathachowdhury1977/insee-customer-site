import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useTranslation, withTranslation } from "react-i18next";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "My Points",
    },
    aspectRatio: 1 / 2,
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
};

const GraphComponent = (props) => {
  const { data } = props;
  const { t } = useTranslation();
  useEffect(() => {}, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: t("label.my_points"),
      },
      aspectRatio: 1 / 2,
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  return (
    <div>
      <Bar options={options} data={data} height={null} width={null} />
    </div>
  );
};

export default GraphComponent;
