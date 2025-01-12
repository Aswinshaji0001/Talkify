import React from "react";
import "./Edit.scss";

// SVG components
const CardImage = () => (
  <svg width="100%" xmlns="http://www.w3.org/2000/svg">
    <rect height="450" width="540" fill="#ffffff"></rect>
    <defs>
      <linearGradient
        gradientTransform="rotate(222,648,379)"
        y2="100%"
        y1="0"
        x2="0"
        x1="0"
        gradientUnits="userSpaceOnUse"
        id="a"
      >
        <stop stopColor="#ffffff" offset="0"></stop>
        <stop stopColor="#FC726E" offset="1"></stop>
      </linearGradient>
      <pattern
        viewBox="0 0 1080 900"
        y="0"
        x="0"
        height="250"
        width="300"
        id="b"
        patternUnits="userSpaceOnUse"
      >
        <g fillOpacity="0.5">
          <polygon points="90 150 0 300 180 300" fill="#444"></polygon>
          <polygon points="90 150 180 0 0 0"></polygon>
          {/* Add other polygon elements as required */}
        </g>
      </pattern>
    </defs>
    <rect height="100%" width="100%" fill="url(#a)" y="0" x="0"></rect>
    <rect height="100%" width="100%" fill="url(#b)" y="0" x="0"></rect>
  </svg>
);

const CardAvatar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
    <circle r="60" fill="#ff8475" cy="64" cx="64"></circle>
    <circle r="48" opacity=".4" fill="#f85565" cy="64" cx="64"></circle>
    <path
      fill="#7f3838"
      d="m64 14a32 32 0 0 1 32 32v41a6 6 0 0 1 -6 6h-52a6 6 0 0 1 -6-6v-41a32 32 0 0 1 32-32z"
    ></path>
    <path
      opacity=".4"
      fill="#393c54"
      d="m62.73 22h2.54a23.73 23.73 0 0 1 23.73 23.73v42.82a4.45 4.45 0 0 1 -4.45 4.45h-41.1a4.45 4.45 0 0 1 -4.45-4.45v-42.82a23.73 23.73 0 0 1 23.73-23.73z"
    ></path>
    <circle r="7" fill="#fbc0aa" cy="65" cx="89"></circle>
    {/* Add remaining parts of the SVG */}
  </svg>
);

// Main Card Component
const Edit = () => {
  return (
    <div className="edit">
      <div className="card">
        <div className="card__img">
          <CardImage />
        </div>
        <div className="card__avatar">
          <CardAvatar />
        </div>
        <div className="card__title">Vikash Deep Yadav</div>
        <div className="card__subtitle">Web Development</div>
        <div className="card__wrapper">
          <button className="card__btn">Follow</button>
          <button className="card__btn card__btn-solid">Read More</button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
