import React, { useState, useRef } from "react";
import styles from "./Output.module.css";
import { Link } from "react-router-dom";
import { IoPlayCircleOutline } from "react-icons/io5";

import Qr from "../Qr/Qr.jsx";
import Email from "../Email/Email.jsx";
import Loader from "../Loader/Loader.jsx";
import Header from "../Header/Header";

import downloadTxt from "./../../assets/output/download-txt.png";
import waitTxt from "./../../assets/output/wait-txt.png";
import emailBtn from "./../../assets/output/email-btn.png";
import homeBtn from "./../../assets/output/home-btn.png";
import qrBtn from "./../../assets/output/qr-btn.png";

export default function OutputPage({
  generatedImg,
  url,
  generatedVideo,
  setUrl,
}) {
  const printRef = useRef();
  const [showQr, setShowQr] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [isImageMain, setIsImageMain] = useState(true);

  const toggleMedia = () => {
    setIsImageMain((prev) => !prev);
  };
  console.log(generatedImg);
  console.log(generatedVideo);
  return (
    <div className={`flex-col-center ${styles.OutputPage}`}>
      <Header />
      <header
        className={`flex-row-center ${
          generatedImg ? styles.downloadTxtImg : styles.waitTxtImg
        }`}
      >
        <img
          src={generatedImg ? downloadTxt : waitTxt}
          alt="ready-to-download"
        />
      </header>

      {generatedImg || generatedVideo ? (
        <div className={styles.generatedImgContainer}>
          <div className={`flex-col-center ${styles.imgWrapper}`}>
            {isImageMain ? (
              <div className={`${styles.imgContainer}`}>
                <img ref={printRef} src={generatedImg} alt="generated-image" />
                <div className={styles.playIcon} onClick={toggleMedia}>
                  <IoPlayCircleOutline />
                </div>
              </div>
            ) : (
              <div className={`flex-col-center ${styles.imgContainer}`}>
                <div className="">
                  <video
                    className="videoGenerated"
                    autoPlay
                    src={generatedVideo}
                    alt="generated-video"
                    title="Generated Video"
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                      height: "auto",
                      display: "block",
                    }}
                  ></video>
                </div>
                <div className={styles.playIcon} onClick={toggleMedia}>
                  <IoPlayCircleOutline />
                </div>
              </div>
            )}
          </div>
          <div className={`flex-row-center ${styles.btnContainer}`}>
            {/* generate qr */}
            <div
              onClick={() => setShowQr(true)}
              className="flex-row-center btnImg"
            >
              <img src={qrBtn} alt="qr-btn" />
            </div>

            {/* email */}
            <div
              onClick={() => setShowEmail(true)}
              className="flex-row-center btnImg"
            >
              <img src={emailBtn} alt="email-btn" />
            </div>

            <Link to={"/"} className="flex-row-center btnImg">
              <img src={homeBtn} alt="home-btn" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          <Loader />
        </div>
      )}

      {/* qr */}
      {showQr && <Qr url={url} setShowQr={setShowQr} />}

      {/* email */}
      {showEmail && <Email setShowEmail={setShowEmail} url={url} />}
    </div>
  );
}
