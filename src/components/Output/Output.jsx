import React, { useState, useRef } from "react";
import styles from "./Output.module.css";
import { Link } from "react-router-dom";
// import { useReactToPrint } from "react-to-print";

import Qr from "../Qr/Qr.jsx";
import Email from "../Email/Email.jsx";
import Loader from "../Loader/Loader.jsx";
import Header from "../Header/Header";

import downloadTxt from "./../../assets/output/download-txt.png";
import waitTxt from "./../../assets/output/wait-txt.png";
import emailBtn from "./../../assets/output/email-btn.png";
import homeBtn from "./../../assets/output/home-btn.png";
import qrBtn from "./../../assets/output/qr-btn.png";

export default function OutputPage({ generatedImg, url, setUrl }) {
  const printRef = useRef();
  const [showQr, setShowQr] = useState(false);
  const [showEmail, setShowEmail] = useState(false);

  // handle print
  // const handlePrint = useReactToPrint({
  //   content: () => printRef.current,
  // });

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

      {/* <h1>{generatedImg ? "READY TO DOWNLOAD ?" : "PLEASE WAIT...!"}</h1> */}

      {generatedImg ? (
        <div className={styles.generatedImgContainer}>
          <div className={`flex-row-center ${styles.imgWrapper}`}>
            <div className={`flex-row-center ${styles.imgContainer}`}>
              <img ref={printRef} src={generatedImg} alt="generated-image" />
            </div>
          </div>
          <div className={`flex-row-center ${styles.btnContainer}`}>
            {/* generate qr */}
            <div
              onClick={() => setShowQr(true)}
              className="flex-row-center btnImg"
            >
              {/* <button className={`btn2`}>QR</button> */}
              <img src={qrBtn} alt="qr-btn" />
            </div>

            {/* email */}
            <div
              onClick={() => setShowEmail(true)}
              className="flex-row-center btnImg"
            >
              {/* <button className={`btn2`}>EMAIL</button> */}
              <img src={emailBtn} alt="email-btn" />
            </div>

            {/* print */}
            {/* <div onClick={handlePrint} className={`imgContainer ${styles.btn}`}>
              <img src={printBtn} alt="generate-qr-button" />
            </div> */}

            <Link to={"/"} className="flex-row-center btnImg">
              {/* <button className={`btn2`}>HOME</button> */}
              <img src={homeBtn} alt="home-btn" />
            </Link>
          </div>
        </div>
      ) : (
        <div className={styles.loader}>
          {/* <img src={loader} alt="loader" /> */}
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
