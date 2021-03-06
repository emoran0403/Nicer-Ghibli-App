import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const FilmDetails = (props) => {
  const { filmid } = useParams();
  const [filmData, setFilmData] = useState();
  const [cast, setCast] = useState([]);

  /**
   * props.movies - array of movie objects
   * props.characters - array of movie characters
   * props.locations
   */

  const getCast = () => {
    let tempCast = [];
    let castIDs = filmData?.people.map((char) => char.substring(39)); // makes an array containing the cast IDs
    castIDs?.forEach((castMembers) => {
      // first, look inside the list of cast IDs
      // castMember is a single cast member's ID
      props.characters.forEach((character) => {
        // then look inside the list of characters
        if (castMembers === character.id) {
          // if a cast id matches a character id, add the character name to the cast array
          tempCast.push(character.name);
        }
      });
    });
    // setCast(tempCast);
    return tempCast; // this will be pushed into when a cast member from the list of characters is found.  this will then be mapped over for our page
  };

  useEffect(() => {
    fetch(`https://ghibliapi.herokuapp.com/films/${filmid}`)
      .then((response) => response.json())
      .then((thisFilm) => setFilmData(thisFilm));
  }, []); // this will run right after the page loads.  this sets the film data

  useEffect(() => {
    setCast(getCast());
  }, [filmData]); // this will run after the film data is set, which will then set the cast data

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div key={filmData?.id} className="card col-md-6">
            <img className="card-img-top" src={filmData?.movie_banner} alt="Card image cap"></img>
            <div className="card-body">
              <h5 className="card-title">
                {filmData?.title} | {filmData?.original_title} | {filmData?.original_title_romanised}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted">
                Directed by: {filmData?.director} | Produced by: {filmData?.producer}
              </h6>
              <p className="card-text">{filmData?.description}</p>
              {cast.length >= 1 ? <h5>Characters:</h5> : <h5>No cast listed :/</h5>}
              <ul>{filmData && cast.map((item) => <li key={item}>{item}</li>)}</ul>

              <footer className="blockquote-footer">
                <a className="btn btn-success btn-sm" href={filmData?.url} target="_blank">
                  View my JSON
                </a>
                Release date: {filmData?.release_date} Run time: {Math.floor(filmData?.running_time / 60) + " Hrs " + (filmData?.running_time % 60) + " Mins"}
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmDetails;
