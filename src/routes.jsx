import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./screens/login";
import Register from "./screens/register";
import PlanSelection from "./screens/planselection";
import PaymentScreen from "./screens/payment";
import PlanView from "./screens/planview";

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/planSelection" element={<PlanSelection />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/planview" element={<PlanView />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
