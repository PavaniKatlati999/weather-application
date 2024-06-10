import React from "react";
import SearchResult from "./SearchResult";

const SearchPanel = ({
  showModal,
  setSearchQuery,
  fetchSearchResults,
  searchResults,
  addCity,
  searchQuery,
}) => (
  <div className="left-panel">
    {showModal && (
      <div className="search">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <button onClick={() => fetchSearchResults()} className="search-button">
          Search
        </button>
      </div>
    )}
    <div className="search-results">
      <table className="search-results-table">
        <tbody>
          {searchResults.map((city) => (
            <SearchResult key={city.id} city={city} addCity={addCity} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SearchPanel;
