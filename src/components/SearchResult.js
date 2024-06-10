import React from "react";

const SearchResult = ({ city, addCity }) => (
  <tr className="search-result">
    <td onClick={() => addCity(city)}>{city.name}</td>
  </tr>
);

export default SearchResult;
