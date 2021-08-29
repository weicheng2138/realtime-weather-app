import { StrictMode } from "react";
import ReactDOM from "react-dom";
import WeatherApp from "./WeatherApp";

// 這支 CSS 檔的樣式會作用到全域
import "./styles.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <WeatherApp />
  </StrictMode>,
  rootElement
);
