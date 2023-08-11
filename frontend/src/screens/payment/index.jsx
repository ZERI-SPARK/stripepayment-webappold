import React, { useEffect, useState } from "react";
import styles from "./payment.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { planDetail } from "../planselection";
import { getPlanId } from "../../utils/helpers";
export default function PaymentScreen() {
  let location = useLocation();
  let userId = localStorage.getItem("userId");
  let activeOption = location.state.activeOption;
  let activeButton = location.state.activeButton;
  let planinterval;
  if (!activeOption) {
    planinterval = "month";
  } else {
    planinterval = "year";
  }
  useEffect(() => {
    let planId = getPlanId(planinterval, activeOption);
    let update = { ...details };
    update["planId"] = planId;
    setDetails(update);
  }, []);
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    planActive: activeOption,
    planinterval: planinterval,
    userId: userId,
  });
  const handleChange = (e) => {
    let updatedValue = { ...details };
    updatedValue[e.target.name] = e.target.value;
    setDetails(updatedValue);
    console.log(updatedValue, "val");
  };
  const handleValidation = async (e) => {
    if (
      details?.cardnumber?.length > 8 &&
      details?.cardmonth?.length == 2 &&
      details?.cardmonth < 13 &&
      details?.cardyear?.length == 2 &&
      details?.cardcvv?.length == 3
    ) {
      await fetch("https://payment-pccw.onrender.com/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // This will show the actual response data
          if (data) {
            navigate("/planview");
          } else {
            notify();
          }
        });
    } else {
      notify();
    }
  };
  const notify = () => {
    console.log("in not");
    toast("Error in details!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  return (
    <div className="h-screen flex items-center bg-[#1e4c91]">
      <ToastContainer />
      <div className="mx-auto  bg-white flex  max-w-[700px] h-fit  rounded-xl w-[80%] overflow-hidden">
        <div className="w-[60%] p-4">
          <h3 className="text-xl font-bold">Complete Payment</h3>
          <p className="text-sm mb-3">
            Enter your credit or debit card details below.
          </p>
          <div className={`flex items-center ${styles.cardInputContainer}`}>
            <img src="/credit-card.png" />
            <input
              className={styles.cardInput}
              placeholder="Card Number"
              onChange={handleChange}
              name="cardnumber"
              type="number"
            />
            <input
              className={styles.cardInput}
              placeholder="MM"
              onChange={handleChange}
              name="cardmonth"
              type="number"
            />{" "}
            /
            <input
              className={styles.cardInput}
              placeholder="YY"
              onChange={handleChange}
              name="cardyear"
              type="number"
            />
            <input
              className={styles.cardInput}
              placeholder="CVC"
              onChange={handleChange}
              name="cardcvv"
              type="number"
            />
          </div>
          <button
            onClick={handleValidation}
            className="bg-[#1e4c91] text-white p-[2%] rounded-sm mt-4 text-sm"
          >
            Confirm Payment
          </button>
        </div>
        <div className="bg-[#f1f1f1] w-[40%] p-4">
          <h3 className="text-xl font-bold mb-3">Order Summary</h3>
          <div className="flex justify-between mb-3 text-sm">
            <p>Plan Name</p>
            <p className="capitalize ">{activeOption}</p>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <p>Billing Cycle</p>
            <p>{!activeButton ? "Monthly" : "Yearly"}</p>
          </div>
          <div className="flex justify-between mb-3 text-sm">
            <p>Plan Price</p>
            <p>
              ₹{" "}
              {!activeButton
                ? `${planDetail[activeOption].monthlyPrice}/mo`
                : `${planDetail[activeOption].yearlyPrice}/yr`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
