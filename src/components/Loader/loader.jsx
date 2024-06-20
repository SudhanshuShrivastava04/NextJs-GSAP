"use client";

import React, { useState, useEffect } from "react";
import { gsap, CSSPlugin, Expo } from "gsap";
import "./loader.css";

gsap.registerPlugin(CSSPlugin);

const Loader = ({ children }) => {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const count = setInterval(() => {
      setCounter((counter) =>
        counter < 100
          ? counter + 1
          : (clearInterval(count), setCounter(100), reveal())
      );
    }, 25);
    return () => clearInterval(count);
  }, []);

  const reveal = () => {
    const t1 = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
        console.log("completed");
      },
    });
    t1.to(".follow", {
      width: "100%",
      ease: Expo.easeInOut,
      duration: 1.2,
      delay: 0.7,
    })
      .to(".hide", { opacity: 0, duration: 0.3 })
      .to(".hide", { display: "none", duration: 0.3 })
      .to(".follow", {
        height: "100%",
        ease: Expo.easeInOut,
        duration: 0.7,
        delay: 0.2,
      })
      .to(".content", { width: "100%", ease: Expo.easeInOut, duration: 0 })
      .to(".title-lines", { display: "block", duration: 0.1 })
      .to(".title-lines", {
        opacity: 1,
        stagger: 0.15,
        ease: Expo.easeInOut,
        duration: 0.6,
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <div className="follow"></div>
          <div
            className="hide progress-bar"
            id="progress-bar"
            style={{ width: counter + "%" }}
          ></div>
          <p id="count" className="hide">
            {counter}%
          </p>

          {/* <div className="content">
            <p className="title-lines">The greatest glory in living lies</p>
            <p className="title-lines">not in never falling,</p>
            <p className="title-lines">but in rising every time we fall.</p>
            <p className="title-lines">-Nelson Mandela</p>
          </div> */}
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
