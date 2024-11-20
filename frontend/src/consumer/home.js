import React, { useState } from "react";
import ConsumerNavbar from "./navbar.js";

export default function ConsumerHome() {
  const [isHovered, setHovered] = useState(false);
  let img = {
    backgroundImage:
      "url('https://img.freepik.com/free-photo/abstract-digital-grid-black-background_53876-97647.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  let top = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  let button = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "13rem",
    overflow: "hidden",
    height: "3rem",
    backgroundSize: "300% 300%",
    backdropFilter: "blur(1rem)",
    borderRadius: "5rem",
    transition: "0.5s",
    border: "double 4px #001214",
    backgroundImage:
      "linear-gradient(#212121, #212121), linear-gradient(137.48deg, #ffdb3b 10%, #FE53BB 45%, #8F51EA 67%, #0044ff 87%)",
    backgroundOrigin: "border-box",
    transform: isHovered ? "scale(1.1)" : "scale(1)",
  };
  let strong = {
    zIndex: "2",
    fontFamily: "Mukta",
    fontSize: "15px",
    letterSpacing: "5px",
    color: "#FFFFFF",
    // textShadow: '0 0 4px white'
  };
  let glow = {
    position: "absolute",
    display: "flex",
    width: "12rem",
  };
  let circle = {
    width: "100%",
    height: "30px",
    filter: "blur(2rem)",
    zIndex: "-1",
  };

  return (
    <>
      <ConsumerNavbar />
      <div style={{ ...img }}>
        <div style={{ ...top, height: "500px" }}>
          <div
            style={{ display: "flex-column" }}
            className="align-items-center"
          >
            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontFamily: "Mukta",
                margin: "0",
                color: "white",
              }}
            >
              Get Started with Lorem Ipsum
            </h1>
            <p
              style={{
                margin: "20px 0 20px 0",
                textAlign: "center",
                color: "white",
              }}
            >
              Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem
              ipsum Lorem ipsum{" "}
            </p>
            <a
              style={{
                textDecoration: "none",
                display: "inline-block",
                margin: "20px 230.825px 0 230.825px",
              }}
              href="/consumer/form"
            >
              <button
                style={{ ...button }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseDown={() => setHovered(false)}
                className="btn"
                type="button"
              >
                <strong style={{ ...strong }}>Get Started</strong>
                <div style={{ ...glow }} id="glow">
                  <div
                    style={{ ...circle, background: "#003337" }}
                    className="circle"
                  ></div>
                  <div
                    style={{ ...circle, background: "#02fffd" }}
                    className="circle"
                  ></div>
                </div>
              </button>
            </a>
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: "#001c20", display: "flex-row" }}>
        <div style={{}}>
          <h3 style={{ color: "white" }}>Lorem Ipsum</h3>
        </div>
        <div style={{}}>
          <img />
        </div>
      </div>
    </>
  );
}