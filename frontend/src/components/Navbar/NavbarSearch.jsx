import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../../cssStyle/Navbar/NavbarSearch.css"
const NavbarSearch = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();

    const value = keyword.trim();

    if (!value) return;

    navigate(`/search?keyword=${encodeURIComponent(value)}`);
  };

  return (
    <form className="navbar-search-form" onSubmit={searchHandler}>
      <FaSearch className="navbar-search-icon" />

      <input
        type="text"
        placeholder="Search jobs, companies, skills..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="navbar-search-input"
      />

      <button type="submit" className="navbar-search-button">
        Search
      </button>
    </form>
  );
};

export default NavbarSearch;
