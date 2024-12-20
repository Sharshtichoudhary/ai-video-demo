import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { cardsArr } from "../../assets/avatar/cards";

import startBtn from "../../assets/home/start-btn.png";

import "./Home.css";
import Header from "../Header/Header";

export default function HomePage({ setUrl }) {
  // data reset
  // Uncomment this if you need the URL to be reset on component mount
  // useEffect(() => {
  //   setUrl("");
  // }, [setUrl]);

  return (
    <div className="flex-col-center HomePage">
      <Header />
      <div className="flex-col-center avatarContainer">
        {cardsArr?.map((item, idx) => (
          <div
            key={idx}
            className={`flex-row-center singleImg ${
              idx === 4 || idx === 5 ? "vertImg" : "horiImg"
            }`}
          >
            <img src={item} alt="avatar" />
          </div>
        ))}
      </div>

      <Link to="/camera" className="flex-row-center btnImg">
        <img src={startBtn} alt="start-btn" />
      </Link>
    </div>
  );
}
