import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import WeatherIcon from "./WeatherIcon";

import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RedoIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";
import { ReactComponent as CogIcon } from "./images/cog.svg";

const svgDefault = () => css`
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
  border-radius: 20px;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  ${svgDefault}
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  ${svgDefault}
`;

const RedoLayout = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const ThemeButton = styled.button`
  position: absolute;
  right: 40px;
  top: 21px;
  cursor: pointer;
  color: ${({ theme }) => theme.titleColor};
  border: 1px solid ${({ theme }) => theme.titleColor};
  background-color: transparent;
  height: 35px;
  width: 80px;
  border-radius: 5px;
`;

const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const WeatherCard = ({
  setToggle,
  toggle,
  weatherElement,
  moment,
  fetchData,
  setCurrentPage,
  cityName
}) => {
  return (
    <div>
      <WeatherCardWrapper>
        <ThemeButton onClick={() => setToggle(!toggle)}>切換主題</ThemeButton>
        <Cog onClick={() => setCurrentPage("WeatherSetting")} />
        <Location>{cityName}</Location>
        <Description>
          {weatherElement.description} {weatherElement.comfortability}
        </Description>
        <CurrentWeather>
          <Temperature>
            {Math.round(weatherElement.temperature)} <Celsius>°C</Celsius>
          </Temperature>
          {/* {console.log(`moment, moment: ${moment}`)} */}
          <WeatherIcon
            currentWeatherCode={weatherElement.weatherCode}
            moment={moment || "day"}
          />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {weatherElement.windSpeed} m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          {Math.round(weatherElement.rainPossibility)} %
        </Rain>
        <RedoLayout onClick={fetchData} isLoading={weatherElement.isLoading}>
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric"
          }).format(new Date(weatherElement.observationTime))}
          {/* <Redo onClick={fetchData} 
              style={{ display: weatherElement.isLoading===false || 'none'  }}
            />
            <Loading
              isLoading={weatherElement.isLoading}
              style={{ display: weatherElement.isLoading===true || 'none'  }}
            /> */}
          {weatherElement.isLoading ? <LoadingIcon /> : <RedoIcon />}
        </RedoLayout>
      </WeatherCardWrapper>
    </div>
  );
};

export default WeatherCard;
