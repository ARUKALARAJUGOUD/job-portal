import { FaSearch } from "react-icons/fa";
import "../../cssStyle/Search/SearchHero.css";

const SearchHero = () => {
  return (
    <section className="search-hero-section">
      <div className="search-hero-overlay">
        <div className="search-hero-content">
          <div className="search-hero-icon">
            <FaSearch />
          </div>

          <h1 className="search-hero-title">
            Find Your Dream Job
          </h1>

          <p className="search-hero-description">
            Search thousands of verified jobs from top companies across India.
            Discover opportunities that match your skills, experience, and career goals.
          </p>

          <div className="search-hero-stats">
            <div className="search-hero-stat-card">
              <h2>10K+</h2>
              <span>Jobs</span>
            </div>

            <div className="search-hero-stat-card">
              <h2>2K+</h2>
              <span>Companies</span>
            </div>

            <div className="search-hero-stat-card">
              <h2>50K+</h2>
              <span>Candidates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchHero;