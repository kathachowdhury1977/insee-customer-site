import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useDispatch, useSelector } from "react-redux";
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
  },
};
const labels = ["January", "February", "March", "April", "May", "June", "July"];
export const data = {
  labels,
  datasets: [
    {
      label: "Points Earned",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#ff0000",
    },
    {
      label: "Points Redeemed",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#000000",
    },
  ],
};
const GraphComponent = () => {
  const { t } = useTranslation();
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
    },
  };
  const labels = ["January", "February", "March", "April", "May", "June", "July"];
  const data = {
    labels,
    datasets: [
      {
        label: t("label.pointsEarned"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "#ff0000",
      },
      {
        label: t("label.pointsRedeemed"),
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: "#000000",
      },
    ],
  };
  return (
    <>
      <Bar options={options} data={data} />
    </>
  );
};

export default GraphComponent;
