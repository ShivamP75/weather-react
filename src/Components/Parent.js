import React from "react";
import GetLocation from "./GetLocation";

import "./Parent.css";
import TopCity from "./TopCity";
export default function Parent() {
  return (
    <>
      <div id="topBox">
        <GetLocation />
      </div>
      <div id="bottomBox">
        <TopCity cityName={"Delhi"}/>
        <TopCity cityName={"Mumbai"}/>
        <TopCity cityName={"Pune"}/>
      </div>
    </>
  );
}
