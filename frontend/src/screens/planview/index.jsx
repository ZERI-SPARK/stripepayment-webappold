import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlanView() {
  const [cancel, setCancel] = useState(false);
  const [userPlan, setUserPlan] = useState({});
  let userId = localStorage.getItem("userId");
  const handleClick = () => {
    setCancel(true);
  };
  let navigate = useNavigate();
  useEffect(() => {
    getUserPlan();
  }, []);
  const getUserPlan = async () => {
    await fetch("https://payment-pccw.onrender.com/getPlan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.user[0]);
        setUserPlan(data.user[0]);
      });
  };
  return (
    <div className="h-screen flex items-center bg-[#1e4c91]">
      <div className="mx-auto  bg-white   max-w-[450px] h-fit  rounded-xl w-[80%] overflow-hidden relative p-4">
        <div className="flex items-center">
          <h4 className="text-lg mr-3 font-bold">Current Plan Details</h4>
          {!cancel ? (
            <p className="bg-[#5590e998] text-[#1e3e6f] text-sm rounded-sm flex items-center px-2">
              Active
            </p>
          ) : (
            <p className="bg-[#eb9393a8] text-[#ba3737] text-sm rounded-sm flex items-center px-2">
              Cancelled
            </p>
          )}
          {!cancel && (
            <span
              className="text-[14px] font-bold absolute right-5 text-[#1e4c91] cursor-pointer"
              onClick={handleClick}
            >
              Cancel
            </span>
          )}
        </div>
        <div>
          <p className="text-[15px] mt-5 capitalize">{userPlan.planActive}</p>
          <p className="text-[gray] text-[13px]">Phone + Tablet</p>
          <p>
            <span className="text-xl font-bold"> ₹ 2,000</span>/yr
          </p>
          <button
            className="rounded-md border-2 px-4 py-1 border-[#1e4c91] text-[#1e4c91] mb-4"
            onClick={() => navigate("/planselection")}
          >
            Change Plan
          </button>
          <p className="text-[12px] text-[gray]">
            Your Subscription has started on Aug 11th,2023 and will auto renew
            on Jul 12th,2023.
          </p>
        </div>
      </div>
    </div>
  );
}
