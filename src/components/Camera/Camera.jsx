import React, { useState, useRef, useEffect } from "react";
import styles from "./Camera.module.css";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";
import Header from "../Header/Header";

import captureTxt from "../../assets/camera/capture-txt.png";
import likeThis from "../../assets/camera/like-this.png";
import captureBtn from "../../assets/camera/capture-btn.png";
import retakeBtn from "../../assets/camera/retake-btn.png";
import submitBtn from "../../assets/camera/submit-btn.png";
export default function CameraPage({ setCapturedImg }) {
  const webRef = useRef();
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [isCaptured, setIsCaptured] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let countdownInterval;

    if (isCounting && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (isCounting && countdown === 0) {
      // Capture the screenshot when countdown hits 0
      if (webRef.current.getScreenshot()) {
        setIsCaptured(true);
        setImg(webRef.current.getScreenshot());
      }
      setIsCounting(false); // Stop counting
    }

    return () => clearInterval(countdownInterval); // Cleanup interval on unmount or re-run
  }, [isCounting, countdown]);

  // console.log(countdown);

  const handleCapture = (e) => {
    // Reset countdown and start it
    setCountdown(3);
    setIsCounting(true);
  };

  // handle-retake
  const handleRetake = (e) => {
    setIsCaptured(false);
    img && setImg("");
    setCountdown(3);
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // handle submit
  const handleSubmit = () => {
    // console.log("captured image submitting");
    if (img) {
      setCapturedImg(img);
      navigate("/avatar");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div className={`flex-col-center ${styles.CameraPage}`}>
      <Header />
      <header className={`flex-row-center ${styles.header}`}>
        <div
          className={`flex-row-center ${
            isCaptured ? styles.likeThisImg : styles.captureTxtImg
          }`}
        >
          <img src={isCaptured ? likeThis : captureTxt} />
        </div>
      </header>

      {/* <h1>{isCaptured ? "DO YOU LIKE THIS ?" : "CAPTURE YOUR PHOTO"}</h1> */}

      <main className={`flex-row-center ${styles.main}`}>
        <div className={styles.webcamParent}>
          {!img && (
            <Webcam
              ref={webRef}
              id={styles.webcam}
              forceScreenshotSourceSize={true}
            />
          )}

          {!isCaptured && isCounting && (
            <h1 className={styles.countdown}>{countdown}</h1>
          )}

          {img && (
            <img
              src={img}
              alt="captured image"
              className={styles.capturedImage}
            />
          )}
          {/* {img ? (
            <img
              src={img}
              alt="captured image"
              className={styles.capturedImage}
            />
          ) : (
            <Webcam
              ref={webRef}
              id={styles.webcam}
              forceScreenshotSourceSize={true}
            />
          )} */}
        </div>
      </main>

      <footer className={`flex-col-center ${styles.footer}`}>
        {isCaptured ? (
          <div className={`flex-row-center ${styles.afterCaptureBtnContainer}`}>
            <div
              onClick={(e) => handleRetake(e)}
              className="flex-row-center btnImg"
            >
              <img src={retakeBtn} alt="retake-button" />
            </div>

            <div onClick={handleSubmit} className="flex-row-center btnImg">
              <img src={submitBtn} alt="submit-button" />
            </div>
          </div>
        ) : (
          <div
            onClick={(e) => handleCapture(e)}
            className="flex-row-center btnImg"
          >
            <img src={captureBtn} alt="capture-button" />
          </div>
        )}
      </footer>
    </div>
  );
}
