import React, { useEffect, useState } from "react";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import CreateBooking from "./pages/createBooking.jsx";
import ListBookings from "./pages/listBookings.jsx";

function App() {
  return (
    <Routes>
      <Route path={"/"} element={<CreateBooking />} />
      <Route path={"/listBookings"} element={<ListBookings />} />
    </Routes>
  );
}

export default App;
