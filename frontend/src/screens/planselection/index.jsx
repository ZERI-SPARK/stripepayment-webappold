import React, { useState } from "react";
import styles from "./plan.module.css";
import { useNavigate } from "react-router-dom";

export const planDetail = {
  basic: {
    monthlyPrice: "100",
    yearlyPrice: "1000",
    videoQuality: "Good",
    resolution: "480p",
    devices: ["Phone"],
    numberOfScreens: 1,
  },
  standard: {
    monthlyPrice: "200",
    yearlyPrice: "2000",
    videoQuality: "Good",
    resolution: "720p",
    devices: ["Phone", "Tablet"],
    numberOfScreens: 3,
  },
  premium: {
    monthlyPrice: "500",
    yearlyPrice: "5000",
    videoQuality: "Better",
    resolution: "1080p",
    devices: ["Phone", "Tablet", "Computer"],
    numberOfScreens: 5,
  },
  regular: {
    monthlyPrice: "700",
    yearlyPrice: "7000",
    videoQuality: "Best",
    resolution: "4K+HDR",
    devices: ["Phone", "Tablet", "TV"],
    numberOfScreens: 10,
  },
};
export default function PlanSelection() {
  const [activeButton, setActiveButton] = useState(false);
  const [activeOption, setActiveOption] = useState("basic");
  const navigate = useNavigate();
  const handleHover = (data) => {
    setActiveOption(data);
  };
  const handlePlanSave = () => {
    navigate("/payment", { state: { activeOption, activeButton } });
  };
  return (
    <div className={styles.plan_container}>
      <h1 className="text-center font-bold text-xl mb-5 mt-8">
        Choose the right plan for you
      </h1>
      <div className="flex items-center justify-between">
        <div className="mr-24">
          <div className={`${styles.toggle_container} flex`}>
            <button
              className={`${
                !activeButton ? styles.activebutton : styles.inactivebutton
              } ${styles.toggleButton}`}
              onClick={() => setActiveButton(false)}
            >
              Monthly
            </button>
            <button
              className={`${
                activeButton ? styles.activebutton : styles.inactivebutton
              } ${styles.toggleButton}`}
              onClick={() => setActiveButton(true)}
            >
              Yearly
            </button>
          </div>
        </div>
        {Object.keys(planDetail).map((detail, id) => {
          return (
            <div
              key={`detailHead-${id}`}
              className={`${styles.select_option}  ${
                activeOption === detail ? styles.select_active_option : ""
              }`}
              onMouseEnter={() => handleHover(detail)}
            >
              {detail}
            </div>
          );
        })}
      </div>
      <div className="flex border-b items-center justify-between text-center mt-4 pb-4">
        <div
          className={`w-[156px] text-left mr-20 ml-4 ${styles.plan_detail_text}`}
        >
          Monthly price
        </div>
        {Object.keys(planDetail).map((detail, id) => {
          return (
            <>
              <div
                className={`w-[95px] ${
                  activeOption === detail ? styles.activeText : ""
                }`}
              >
                ₹{" "}
                {!activeButton
                  ? planDetail[detail].monthlyPrice
                  : planDetail[detail].yearlyPrice}
              </div>
            </>
          );
        })}
      </div>
      <div className="flex border-b items-center justify-between text-center mt-4 pb-4">
        <div
          className={`w-[156px] text-left mr-20 ml-4 ${styles.plan_detail_text}`}
        >
          Video quality
        </div>
        {Object.keys(planDetail).map((detail, id) => {
          return (
            <>
              <div
                className={`w-[95px] ${
                  activeOption === detail ? styles.activeText : ""
                }`}
              >
                {planDetail[detail].videoQuality}
              </div>
            </>
          );
        })}
      </div>
      <div className="flex border-b items-center justify-between text-center mt-4 pb-4">
        <div
          className={`w-[156px] text-left mr-20 ml-4 ${styles.plan_detail_text}`}
        >
          Resolution
        </div>
        {Object.keys(planDetail).map((detail, id) => {
          return (
            <>
              <div
                className={`w-[95px] ${
                  activeOption === detail ? styles.activeText : ""
                }`}
              >
                {planDetail[detail].resolution}
              </div>
            </>
          );
        })}
      </div>
      <div className="flex  items-top justify-between text-center mt-4 pb-4">
        <div
          className={`w-[156px] text-left  mr-20 ml-4 ${styles.plan_detail_text}`}
        >
          Devices you can use to watch
        </div>
        {Object.keys(planDetail).map((detail, id) => {
          return (
            <>
              <div
                className={`w-[95px]  text-[13px] ${
                  activeOption === detail ? styles.activeText : ""
                }`}
              >
                {planDetail[detail].devices.map((device) => {
                  return <p className="mb-9">{device}</p>;
                })}
              </div>
            </>
          );
        })}
      </div>

      <button className={styles.plan_submit_btn} onClick={handlePlanSave}>
        Next
      </button>
    </div>
  );
}
