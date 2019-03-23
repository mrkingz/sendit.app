import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

const ImageCard = ({ image, text }) => {
  return (
    <div className="index-card-wrapper">
      <img src={image} alt="" />
      <div className="details">
        <p>{ReactHtmlParser(text)}</p>
      </div>
    </div>
  );
};
ImageCard.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
export default ImageCard;
