import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  /**
   * props.getFilms
   * props.getPeople
   * props.getLocations
   */
  const nav = useNavigate();

  const getData = async () => {
    try {
      // fetches data from the api for people
      const response1 = await fetch("https://ghibliapi.herokuapp.com/people"); // this is the fetch
      const peopleData = await response1.json(); // parses the response as JSON data to produce a JS object
      props.getPeople(peopleData); // passes the people object to the people state, which is then sent to the components

      // fetches data from the api for films
      const response2 = await fetch("https://ghibliapi.herokuapp.com/films"); // this is the fetch
      const filmData = await response2.json(); // parses the response as JSON data to produce a JS object
      props.getFilms(filmData); // passes the films object to the films state, which is then sent to the components

      // fetches data from the api for locations
      const response3 = await fetch("https://ghibliapi.herokuapp.com/locations"); // this is the fetch
      const locationdata = await response3.json(); // parses the response as JSON data to produce a JS object
      props.getLocations(locationdata); // passes the locations object to the locations state, which is then sent to the components
    } catch (error) {
      nav("../errorlanding"); // displays an error page if fetch is unsuccessful
    }
  };

  useEffect(() => {
    getData(); // fetches people, films, and locations data after the home page renders
  }, []); // empty dependency array means we only fetch this data once

  return (
    <>
      <div className="d-flex mt-4 justify-content-center">
        <img src="Studio_Ghibli_Logo.jpg" alt="Studio Gibbles" width={1200} height="auto" />
      </div>
    </>
  );
};

export default Home;
