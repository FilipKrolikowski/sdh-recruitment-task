import React from "react";
import "./App.css";
import SearchStocks from "./components/SearchStocks";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Company from "./components/Company";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div className="dashboard">
              <SearchStocks />
            </div>
          }
        ></Route>
        <Route path="/company/:symbol" element={<Company />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
