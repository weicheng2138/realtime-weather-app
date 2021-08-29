import React, { useState, useEffect, useMemo } from "react";
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import sunriseAndSunsetData from "./sunrise-sunset.json";
import WeatherCard from "./WeatherCard";
import useWeatherApi from "./useWeatherApi";
import WeatherSetting from "./WeatherSetting";
import { findLocation } from "./utils";

const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282"
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "#121416",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc"
  }
};

const Container = styled.section`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const getMoment = (locationName) => {
  console.log(`WeatherApp getMoment --- ${locationName}`);
  const location = sunriseAndSunsetData.find(
    (data) => data.locationName === locationName
  );

  console.log(`WeatherApp getMoment --- ${location}`);
  if (!location) return null;

  const now = new Date();
  const nowDate = Intl.DateTimeFormat("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  })
    .format(now)
    .replace(/\//g, "-");

  const locationDate =
    location.time && location.time.find((time) => time.dataTime === nowDate);
  const sunriseTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunrise}`
  ).getTime();
  const sunsetTimestamp = new Date(
    `${locationDate.dataTime} ${locationDate.sunset}`
  ).getTime();
  const nowTimeStamp = now.getTime();

  return sunriseTimestamp <= nowTimeStamp && nowTimeStamp <= sunsetTimestamp
    ? "day"
    : "night";
};

const WeatherApp = () => {
  const storageCity = localStorage.getItem("cityName");
  const [currentCity, setCurrentCity] = useState(storageCity || "臺北市");
  const currentLocation = findLocation(currentCity) || {};
  const [currentPage, setCurrentPage] = useState("WeatherCard");
  const [weatherElement, fetchData] = useWeatherApi(currentLocation);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [toggle, setToggle] = useState(true);

  const moment = useMemo(() => {
    // console.log("useMemo");
    const tempMoment = getMoment(currentLocation.sunriseCityName);
    setCurrentTheme(tempMoment === "day" ? "light" : "dark");
    tempMoment === "day" ? setToggle(true) : setToggle(false);
    return tempMoment;
  }, [currentLocation.sunriseCityName]);

  useEffect(() => {
    // console.log("useEffect toggle");
    toggle ? setCurrentTheme("light") : setCurrentTheme("dark");
  }, [toggle]);

  useEffect(() => {
    // console.log(`useEffect theme + ${moment}`);
    setCurrentTheme(moment === "day" ? "light" : "dark");
    moment === "day" ? setToggle(true) : setToggle(false);
  }, [moment]);

  useEffect(() => {
    localStorage.setItem("cityName", currentCity);
  }, [currentCity]);

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {/* {console.log(`render, moment: ${moment}`)} */}

        {currentPage === "WeatherCard" && (
          <WeatherCard
            cityName={currentLocation.cityName}
            setToggle={setToggle}
            toggle={toggle}
            weatherElement={weatherElement}
            moment={moment}
            fetchData={fetchData}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === "WeatherSetting" && (
          <WeatherSetting
            cityName={currentLocation.cityName}
            setCurrentPage={setCurrentPage}
            setCurrentCity={setCurrentCity}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default WeatherApp;
