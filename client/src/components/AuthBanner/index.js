import React from "react";
import "./index.scss";
import backgroundImage from "../../assets/img/bg-img.png";
import ChatBubble from "../../assets/svg/ChatBubble";

const AuthBanner = () => {
  return (
    <div className="container banner-section-container">
      <div className="banner-section-content">
        <div className="chat-bubble-container">
          <ChatBubble color={"#fff"} />
        </div>
        <p className="banner-section-content_text">
          Converse with anyone with any language
        </p>
      </div>
      <div className="image-overlay"></div>
      <div
        className="image-container"
        style={{
          backgroundImage: `url("${backgroundImage}")`,
        }}
      ></div>
    </div>
  );
};

export default AuthBanner;
