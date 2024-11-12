import React from "react";

const HeroSection = ({ image, title, description }) => {
  return (
    <div className="position-relative">
      <img
        src={image}
        className="w-100"
        style={{
          objectFit: "cover",
          height: "400px",
          filter: "brightness(50%)",
        }}
        alt="hero image"
      />
      <div
        className="position-absolute top-50 start-50 translate-middle text-center text-white px-3"
        style={{ width: "100%" }}
      >
        <h1 className="fw-bold" style={{ fontSize: "4rem" }}>
          {title}
        </h1>
        <p className="fs-7" style={{ maxWidth: "600px", margin: "0 auto" }}>
          {description}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
