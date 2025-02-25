import React from "react";

const FilmList = (props) => {
  return (
    <div className="film-css">
      <div className="row">
        {props.films.map((film) => (
          <div key={film.imdbID} className="film-card">
            <img src={film.Poster} alt={film.Title} />
            <div onClick={() => props.favoritesChosen(film)} className="film-overlay">
              <props.Favorites /> {/* Render AddFavorites correctly */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmList;
