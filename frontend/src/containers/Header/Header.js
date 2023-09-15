import React from "react";
import Navbar from "./Navbar/Navbar";
import video from "../../video/writing1.mp4";

const Header = () => {
  return (
    <React.Fragment>
      <Navbar />
      <header id="home">
        <Navbar />
        <div class="banner">
          <div class="container">
            <video
                controls={false}
                muted={true}
                autoPlay={true}
                loop={true}
                class="video-container"
              >
              <source src={video} type="video/mp4" />
            </video>
            <h1>nhận dạng chữ viết tay</h1><br />
            <h2>Handwriting Recognition</h2>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
