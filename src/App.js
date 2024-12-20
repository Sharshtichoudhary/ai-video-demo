import React, { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Camera from "./components/Camera/Camera";
import Avatar from "./components/Avatar/Avatar";
// import NotFound from './components/NotFound';
import Output from "./components/Output/Output";
import "./index.css";

// import Navigation from './components/Navigation';

export default function App() {
  const [capturedImg, setCapturedImg] = useState();
  const [generatedImg, setGeneratedImg] = useState();
  const [url, setUrl] = useState();
  const [gender, setGender] = useState();

  return (
    <BrowserRouter>
      {/* header */}
      {/* <Header /> */}

      <Routes>
        {/* home-page */}
        <Route path="/" element={<Home setUrl={setUrl} />} />

        {/* gender-page */}
        {/*<Route path="/gender" element={<GenderPage setGender={setGender} />} /> */}

        {/* gender-page */}
        <Route
          path="/camera"
          element={<Camera setCapturedImg={setCapturedImg} />}
        />

        {/* avatar-page */}
        <Route
          path="/avatar"
          element={
            <Avatar
              setGeneratedImg={setGeneratedImg}
              capturedImg={capturedImg}
              setUrl={setUrl}
              gender={gender}
            />
          }
        />

        {/* output-page */}
        <Route
          path="/output"
          element={
            <Output generatedImg={generatedImg} url={url} setUrl={setUrl} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
