import React, { useEffect, useState } from "react";
import "./App.css";
import FilmList from "./components/FilmList";
import FilmListHeading from "./components/FilmListHeading";
import SearchBox from "./components/SearchBox";
import AddFavorites from "./components/AddFavorites";
import RemoveFavorites from "./components/removeFavorites";

const App = () => {
  const [films, setFilms] = useState([]);
  const [favoriteFilms, setFavoriteFilms] = useState([]); // Initialize as an array
  const [searchFilm, setSearchFilm] = useState('');

  const getFilmRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchFilm}&apikey=526778b9`;
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.Search) {
      setFilms(responseJson.Search);
    }
  };

  useEffect(() => {
    getFilmRequest();
  }, [searchFilm]);
  useEffect(() => {
    const favoriteFilms=JSON.parse(localStorage.getItem('your-favorite-films'));
    setFavoriteFilms(favoriteFilms)
  }, []);
  
  const saveToLocalStorage=(items)=>{
    localStorage.setItem('your-favorite-films',JSON.stringify(items))
  }
  const addFavoriteFilm = (film) => {
    const newFavoriteList = [...favoriteFilms, film];
    setFavoriteFilms(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };
  const removeFavoriteFilm = (film) => {
    const newFavoriteList = favoriteFilms.filter((favorite) => favorite.imdbID !== film.imdbID);
    setFavoriteFilms(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  return (
    <>
      <div className="App">
        <FilmListHeading heading="Films" />
        <SearchBox searchFilm={searchFilm} setSearchFilm={setSearchFilm} />
      </div>
      <div className="App film-css">
        <h1>Movie Posters</h1>
        <FilmList films={films} favoritesChosen={addFavoriteFilm} Favorites={AddFavorites} />
      </div>
      <div className="App">
        <FilmListHeading heading="Your Favorites" />
      </div>
      <div className="App film-css">
        <FilmList films={favoriteFilms} favoritesChosen={removeFavoriteFilm} Favorites={RemoveFavorites} /> 
      </div>
    </>
  );
};

export default App;
