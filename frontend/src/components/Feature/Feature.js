import React, { useState } from "react";
import Result from "../../result/result.txt";
import "./Feature.css";
import axios from "axios";
import './Uploader.css'
import { MdCloudUpload, MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import { FaDownload, FaChevronRight } from "react-icons/fa";

const Feature = () => {

  const [fileName, setFileName] = useState("No selected file")
  const [previewImage, setPreviewImage] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePrediction, setImagePrediction] = useState("");

  const generatePreviewImage = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (e) => callback(reader.result);
  };

  /*--------------------------------------------------------------------- */
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }

    setImageFile(file);
    generatePreviewImage(file, (previewImageUrl) => {
      setPreviewImage(previewImageUrl);
      setImagePrediction("");
    });
  };

/*--------------------------------------------------------------------- */
  // const uploadTransformerHandler = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", imageFile, "img_transformer.png");

  //   let t0 = performance.now();
  //   axios.post("https://b05c-14-236-7-220.ap.ngrok.io/upload",
  //   formData,{
  //     headers: new Headers({
  //       "ngrok-skip-browser-warning": "69420",
  //     }),
  //   })
  //   .then((res, data) => {
  //     data = res.data;
  //     setImagePrediction(data);
  //     let t1 = performance.now();
  //     console.log(data);
  //     console.log(
  //       "The time Transformer model took to predict the image " +
  //         (t1 - t0) +
  //         " milliseconds."
  //     );
  //   });
  // };
/*--------------------------------------------------------------------- */

  const uploadTransformerHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
      formData.append("file", imageFile, "img_transformer.png");
      axios.post("http://127.0.0.1:5000/upload", formData).then((res, data) => {
        data = res.data;
        setImagePrediction(data);
        console.log(data);
      });

  };

  // const uploadCRNNHandler = (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("file", imageFile, "img_crnn.png");

  //   let t0 = performance.now();
  //   axios.post("https://0a26-14-185-227-52.ap.ngrok.io/upload",
  //   formData,{
  //     headers: new Headers({
  //         "ngrok-skip-browser-warning": "69420",
  //     }),
  // }).then((res, data) => {
  //     data = res.data;
  //     setImagePrediction(data);
  //     let t1 = performance.now();
  //     console.log(data);
  //     console.log(
  //       "The time LSTM & Attention took to predict the image " +
  //         (t1 - t0) +
  //         " milliseconds."
  //     );
  //   });
  // };

  return (
    <div className="container--feature">
      <div className="container--feature__col container--feature__uploading">
        {/* <h3>
       <ImPointDown />
         Upload image in here
        <ImPointDown /></h3> */}
        {/* Button for choosing an image */}
        {/* <div>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="btn"
          />
        </div> */}

        <div className='uploader'>
        <form className='uploader-form'
          onClick={() => document.querySelector(".input-field").click()}
        >
        <input type="file" name="file" className='input-field' hidden
        onChange={handleChange}
        />

        {previewImage ?
        <img src={previewImage} alt={fileName} />
        :
        <>
        <MdCloudUpload color='rgb(15, 220, 247)' size={100} />
        <p>Browse Files to upload</p>
        {/* <p>Thả tập tin tại đây</p> */}
        </>
      }

      </form>

      <section className='uploaded-row'>
        <AiFillFileImage color='rgb(15, 220, 247)' size={25}/>
        <span className='upload-content'>
          {fileName} -
          <MdDelete color='rgb(15, 220, 247)' size={25}
          onClick={() => {
            setFileName("No selected File")
            setPreviewImage(null)
          }}
           />
        </span>
      </section>
      </div>

        {/* Button for sending image to backend */}
        <div style={{ margin: "5px" }}>
          {/* <input
            type="submit"
            onClick={uploadTransformerHandler}
            className="btn"
            value="START"
          /> */}
          <button
            type="submit"
            onClick={uploadTransformerHandler}
            className="btn"
          >
          <FaChevronRight size={13} style={{ paddingRight: "5px" }}/>
          Start
          </button>
        </div>

        {/* Field for previewing the chosen image */}
        {/* <div className="container--image">
          {previewImage && (
            <img alt="inputimg" src={previewImage} className="previewImage" />
          )}
        </div> */}
      </div>

      {/* Text for model prediction */}
      <div>
        {imagePrediction &&
        <p className="predict"><span>Prediction:</span> <br/> {imagePrediction}</p>}
      </div>
      <div className="container--feature__col container--feature__predicted ">
        {imagePrediction && <p>Prediction: {imagePrediction}</p> && (
          <a href={Result} download="result.txt" className="btn">
            <FaDownload style={{ paddingRight: "5px" }}/>
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default Feature;
