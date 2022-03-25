import React from "react";
import "./LogoNavBar.css";
import webLogo from "../../../public/images/web-logo.png";

class WebLogo extends React.Component {
  render() {
    return <img src={webLogo} alt="website logo" />;
  }
}

export default WebLogo;
