import React, { useEffect, useState } from "react";
import styles from "./Avatar.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import { uploadImage } from "../../utils/uploadFirebase";

import { cardsArr } from "../../utils/avatar/cards";
import { originalImagesArr } from "../../utils/avatar/originalImages";

import { base64 } from "../../utils/base64";
import Header from "../Header/Header";

import chooseTxt from "../../assets/avatar/choose-txt.png";
import selectIcon from "../../assets/avatar/select.svg";
import selectBtn from "../../assets/avatar/select-btn.png";

export default function AvatarPage({
  setGeneratedImg,
  capturedImg,
  setUrl,
  gender,
}) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [originalImg, setOriginalImg] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [cards, setCards] = useState();

  // console.log(cardsArr);

  /*   gender &&
    useEffect(() => {
      if (gender.toLowerCase() === "female") {
        setCards(femaleCardsArr);
      } else if (gender.toLowerCase() === "male") {
        setCards(maleCardsArr);
      }
    }, [gender]); */

  // toast options
  const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // filtering card image with actual image
  const filterOriginalImg = (idx) => {
    /* if (gender.toLowerCase() === "female") {
      console.log("female hai");
      const filteredActualImgArr = femaleOriginalImagesArr.filter(
        (actualImg, ActualIndex) => ActualIndex === idx
      );
      return filteredActualImgArr[0];
    } else if (gender.toLowerCase() === "male") {
      console.log("male hai");
      const filteredActualImgArr = maleOriginalImagesArr.filter(
        (actualImg, ActualIndex) => ActualIndex === idx
      );
      return filteredActualImgArr[0];
    } */

    const filteredActualImgArr = originalImagesArr.filter(
      (actualImg, ActualIndex) => ActualIndex === idx
    );
    return filteredActualImgArr[0];
  };

  // image uploading on server
  const getUrl = async (base64OutputData) => {
    // axios
    //   .post("https://techkilla.in/aiphotobooth/aiphotobooth_ifest/upload.php", {
    //     img: url,
    //   })
    //   .then(function (response) {
    //     setUrl(response.data.url);
    //     // console.log("image uploaded on server");
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // firebase
    let outputUrl = await uploadImage(base64OutputData);
    // console.log(output);
    setUrl(outputUrl);
  };

  // submitting the selected image and post request to api
  const handleSubmit = () => {
    // console.log("submitting selected avatar");

    setGeneratedImg("");
    if (capturedImg) {
      base64(originalImg, (base64Data) => {
        // console.log("Base64 data:", base64Data);
        setSelectedImage(base64Data);

        try {
          axios
            .post("https://52.56.108.15/trail_rec", {
              image: capturedImg.split(",")[1],
              choice: base64Data.split(",")[1],
              // status: "PREMIUM",
            })
            .then(function (response) {
              // console.log(response);
              setGeneratedImg(`data:image/webp;base64,${response.data.result}`);

              // image uploading on server
              getUrl(response.data.result);
            })
            .catch(function (error) {
              console.log(error);
            });
          navigate("/output");
        } catch (error) {
          console.error("Error occurred during axios request:", error);
        }
      });
    } else {
      toast.error(
        "Please select an image or capture your photo again...",
        toastOptions
      );
    }
  };

  return (
    <div className={`flex-col-center ${styles.AvatarPage}`}>
      <Header />
      <div className={`imgContainer ${styles.headingImgContainer}`}>
        <img src={chooseTxt} alt="choose-text" />
      </div>

      <main className={`flex-col-center ${styles.main}`}>
        {cardsArr?.map((img, idx) => (
          <div
            key={idx}
            className={`flex-row-center ${styles.singleImg} ${
              idx === 4 || idx === 5 ? styles.vertImg : styles.horiImg
            } `}
            onClick={() => {
              setSelectedImageIndex(idx);
              const originalImg = filterOriginalImg(idx);
              setOriginalImg(originalImg);
            }}
          >
            <div className={styles.parent}>
              <div className={`flex-row-center ${styles.imgContainer}`}>
                <img src={img} alt="avatar" />
              </div>

              <div
                className={`flex-row-center ${styles.hoverContainer} ${
                  selectedImageIndex === idx ? styles.showHoverContainer : ""
                }`}
              >
                <div className={`flex-row-center ${styles.selectIcon}`}>
                  <img src={selectIcon} alt="selected" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer onClick={handleSubmit} className={`flex-row-center btnImg`}>
        <img src={selectBtn} alt="select-button" />
      </footer>
      <ToastContainer />
    </div>
  );
}
