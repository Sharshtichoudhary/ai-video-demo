import React, { useState, useRef, useEffect } from "react";
import styles from "./Camera.module.css";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";

import captureTxt from "../../assets/camera/capture-txt.png";
import likeThis from "../../assets/camera/like-this.png";
import captureBtn from "../../assets/camera/capture-btn.png";
import retakeBtn from "../../assets/camera/retake-btn.png";
import submitBtn from "../../assets/camera/submit-btn.png";

export default function CameraPage({ setCapturedImg, setCapturedVideo }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const webRef = useRef();
  const navigate = useNavigate();

  const [img, setImg] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  // Toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } catch (err) {
        console.error("Error accessing webcam: ", err);
        toast.error("Unable to access your camera.", toastOptions);
      }
    };

    initializeCamera();

    return () => {
      // Stop the webcam stream when the component is unmounted
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const startRecording = () => {
    const stream = videoRef.current.srcObject;
    if (!stream) return;

    const mediaRecorder = new MediaRecorder(stream);
    const chunks = [];
    setIsRecording(true);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });

      // Convert Blob to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(",")[1]; // Extract base64 string
        console.log("Base64 Video:", base64data);
        setVideoURL(base64data); // Save base64 URL if needed
      };

      reader.readAsDataURL(blob); // Read the Blob as a base64 string

      setIsRecording(false);
    };

    // Start recording and stop after 3 seconds
    mediaRecorder.start();
    setTimeout(() => {
      mediaRecorder.stop();
      captureSnapshot();
    }, 3000);
  };

  const captureSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to an image URL
    const snapshotURL = canvas.toDataURL("image/png");
    setImg(snapshotURL);
    setIsCaptured(true);
  };

  const handleRetake = () => {
    setIsCaptured(false);
    setImg(null);
    setVideoURL(null);
  };
  const handleSubmit = () => {
    if (img || videoURL) {
      setCapturedImg(img);
      setCapturedVideo(videoURL);
      navigate("/avatar");
    } else {
      toast.error("Please capture your image or video", toastOptions);
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
          <img src={isCaptured ? likeThis : captureTxt} alt="header-text" />
        </div>
      </header>

      <main className={`flex-row-center ${styles.main}`}>
        <div className={styles.webcamParent}>
          {/* Display the webcam feed if not captured */}
          {!isCaptured && (
            <div>
              <video ref={videoRef} autoPlay muted id={styles.webcam}></video>
              <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
            </div>
          )}

          {/* Display the captured image (screenshot) */}
          {/* {img && ( */}
          {/* <div className={styles.screenshotContainer}> */}
          {/* <h3>Screenshot</h3> */}
          {/* <img */}
          {/* src={img} */}
          {/* alt="Captured Screenshot" */}
          {/* className={styles.capturedImage} */}
          {/* /> */}
          {/* </div> */}
          {/* // )} */}
        </div>
      </main>

      <footer className={`flex-col-center ${styles.footer}`}>
        {isCaptured ? (
          <div className={`flex-row-center ${styles.afterCaptureBtnContainer}`}>
            <div onClick={handleRetake} className="flex-row-center btnImg">
              <img src={retakeBtn} alt="retake-button" />
            </div>

            <div onClick={handleSubmit} className="flex-row-center btnImg">
              <img src={submitBtn} alt="submit-button" />
            </div>
          </div>
        ) : (
          <div onClick={startRecording} className="flex-row-center btnImg">
            <img src={captureBtn} alt="capture-button" />
          </div>
        )}
      </footer>

      {/* {videoURL && (
        <div className={`flex-row-center ${styles.videoPreview}`}>
          <h2>Recorded Video:</h2>
          <video src={videoURL} controls style={{ width: "400px" }}></video>
        </div>
      )} */}
      <ToastContainer />
    </div>
  );
}
