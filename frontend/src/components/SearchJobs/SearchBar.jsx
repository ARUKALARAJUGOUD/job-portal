import {
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "../../cssStyle/Search/SearchBar.css";

const SearchBar = ({
  filters,
  filterChangeHandler,
}) => {
  return (
    <section className="job-search-bar-section">

      <div className="job-search-bar-container">

        {/* Keyword */}

        <div className="job-search-input-group">

          <FaSearch className="job-search-icon" />

          <input
            type="text"
            name="keyword"
            placeholder="Job title, skills, company..."
            value={filters.keyword}
            onChange={filterChangeHandler}
          />

        </div>

        {/* Location */}

        <div className="job-search-input-group">

          <FaMapMarkerAlt className="job-search-icon" />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={filterChangeHandler}
          />

        </div>

        {/* Search Button */}

        <button
          type="button"
          className="job-search-btn"
        >
          Search Jobs
        </button>

      </div>

    </section>
  );
};

export default SearchBar;