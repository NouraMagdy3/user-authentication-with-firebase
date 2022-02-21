import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginForm from "./pages/Auth/LoginForm";
import SignForm from "./pages/Auth/SignForm";
import NotFound from "./pages/Common/NotFound";

//style
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};

const MainApp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<SignForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default MainApp;
