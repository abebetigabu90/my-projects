import React from "react";
const SearchBox = (props) => {
    return (
        <div>
            <input
             className="searchBox"  placeholder="Search for a film"
            value={props.searchFilm}
             onChange={(event)=>props.setSearchFilm(event.target.value)}
            />
        </div>
    );
};

export default SearchBox;