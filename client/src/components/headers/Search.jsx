import React from "react";

const Search = () => {
  return (
    <div className="search-container">
      <div className="search-wrapper">
        <div className="search-control-container">
          <input
            type="text"
            className="track-input"
            placeholder="Track your parcel"
          />
          <button className="btn btn-primary search-btn">Track </button>
        </div>
      </div>
    </div>
  );
};
export default Search;
