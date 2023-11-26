import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EntryPage from "./Pages/entryPage/entryPage";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./Pages/mainPage/mainPage";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/Home" element={<MainPage />}>
          <Route />
          <Route />
          <Route />
          <Route />
        </Route>
      </Routes>
    </>
  );
}

export default App;
