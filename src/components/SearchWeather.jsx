import React, { useState, useEffect } from "react";
import AutocompleteComponent from "./AutocompleteComponent";
import "./SearchWeather.css";
const Searchweather = () => {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [listCity, setListCity] = useState([]);

  let componentMounted = true;
  useEffect(() => {
    fetch("http://localhost:3001/current.city.list.json")
      .then((res) => res.json())
      .then((data) => {
        setListCity(data.map((d) => d.name));
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=3abeb71f4c591b9c9f8293afce6a0cc0`
      );
      if (componentMounted) {
        setData(await response.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, [search]);
  console.log(listCity);
  let emoji = null;
  if (data.main) {
    if (data.weather[0].main == "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main == "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main == "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }
  const temp = (data.main.temp - 273.15).toFixed(2);
  const temp_min = (data.main.temp_min - 273.15).toFixed(2);
  const temp_max = (data.main.temp_max - 273.15).toFixed(2);

  const d = new Date();
  const date = d.getDate();
  const year = d.getFullYear();
  const month = d.toLocaleString("default", { month: "long" });
  const day = d.toLocaleString("default", { weekday: "long" });

  const time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div class="card text-white text-center border-0">
              <img
                src={`https://source.unsplash.com/428x926/?${data.weather[0].main}`}
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form >
                  <div class="InputAutocomplete" onSubmit={handleSubmit}>
                     <AutocompleteComponent />

                    <button type="submit" id="basic-addon2">
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-25 py-3">
                  <h2 class="card-title">{data.name}</h2>
                  <p class="card-text lead">
                    {day}, {month} {date}, {year}
                    <br />
                    {time}
                    <br />
                  </p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{temp}&deg;C </h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg;C | {temp_max}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Searchweather;
