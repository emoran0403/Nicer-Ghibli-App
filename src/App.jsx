//*Imports
import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//*Components
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Films from "./components/Films";
import FilmDetails from "./components/FilmDetails";
import Characters from "./components/Characters";
import CharacterDetails from "./components/CharacterDetails";
import ErrorLanding from "./components/ErrorLanding";
import Locations from "./components/Locations";
import LocationDetails from "./components/LocationDetails";

const App = () => {
  const [films, setFilms] = useState([]);
  const [people, setPeople] = useState([]);
  const [locations, setLocations] = useState([]);

  /** the props object contains:
   * props.movies
   * props.characters
   * props.locations
   */

  /**
   * props.getFilms
   * props.getPeople
   * props.getLocations
   */

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home getFilms={setFilms} getPeople={setPeople} getLocations={setLocations} />} />

        <Route path="/films">
          <Route index element={<Films characters={people} movies={films} locations={locations} />} />
          <Route path=":filmid" element={<FilmDetails characters={people} movies={films} locations={locations} />} />
        </Route>

        <Route path="/characters">
          <Route index element={<Characters characters={people} movies={films} locations={locations} />} />
          <Route path=":characterid" element={<CharacterDetails characters={people} movies={films} locations={locations} />} />
        </Route>

        <Route path="/locations">
          <Route index element={<Locations characters={people} movies={films} locations={locations} />} />
          <Route path=":locationid" element={<LocationDetails characters={people} movies={films} locations={locations} />} />
        </Route>

        <Route path="/errorlanding" element={<ErrorLanding />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

/**
 *
 * ?done make error landing page work
 * ?done lab review video to get nicer film details for characters - 21:51 or 26:00
 * ?done use ^^^ to do the same thing for other pages pulling other info
 * ?done useParams thing for the details pages
 * ?done locations can incorporate people and films
 *
 *
 *
 * //***********************************************************
 *
 *
 * ?done have films details page pull and display people data
 * ?done have films details page pull and display locations data - they do not point to any specific location
 * ! the short circuit to conditionally display characters is not working as expected
 *
 * ?done character details page
 * ?done have character details page pull and display movie data .films
 *
 * ?done locations details page
 * ?done have locations details page pull and display movie data   .films
 * ?done have locations details page pull and display characters data  .residents
 *
 *
 */

//! console log within the film details component infinitely logs, something is wrong lol

/**
 * todo
 * film details: does not show this properly
 * {cast.length >= 1 ? <h5>Characters:</h5> : <h5>No cast listed :/</h5>}
 *
 * todo
 * character details: get title function throws errors, does not display
 *
 * todo
 * location details: neither function gets the relevant data to show
 */
