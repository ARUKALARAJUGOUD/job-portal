import {
  FaBriefcase,
  FaFilter,
  FaMoneyBillWave,
  FaSortAmountDown,
} from "react-icons/fa";

import "../../cssStyle/Search/FilterBar.css";

const FilterBar = ({ filters, filterChangeHandler, setFilters }) => {
  // used to reset the filters
  const resetFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      minSalary: "",
      maxSalary: "",
      experience: "",
      workMode: "",
      employmentType: "",
      sort: "newest",
      page: 1,
      limit: 10,
    });
  };

  return (
    <section className="job-filter-section">
      <div className="job-filter-container">
        <div className="job-filter-title">
          <FaFilter />
          <h2>Filter Jobs</h2>
        </div>

        <div className="job-filter-grid">
          {/* Experience */}

          <div className="job-filter-group">
            <label>
              <FaBriefcase />
              Experience
            </label>

            <select
              name="experience"
              value={filters.experience}
              onChange={filterChangeHandler}
            >
              <option value="">Any Experience</option>
              <option value="0">Fresher</option>
              <option value="1">1+ Years</option>
              <option value="2">2+ Years</option>
              <option value="3">3+ Years</option>
              <option value="5">5+ Years</option>
              <option value="6">6+ Years</option>
              <option value="7">7+ Years</option>
              <option value="8">8+ Years</option>
              <option value="9">9+ Years</option>
              <option value="10">10+ Years</option>
            </select>
          </div>

          {/* Work Mode */}

          <div className="job-filter-group">
            <label>Work Mode</label>

            <select
              name="workMode"
              value={filters.workMode}
              onChange={filterChangeHandler}
            >
              <option value="">All</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">Onsite</option>
            </select>
          </div>

          {/* Employment */}

          <div className="job-filter-group">
            <label>Employment Type</label>

            <select
              name="employmentType"
              value={filters.employmentType}
              onChange={filterChangeHandler}
            >
              <option value="">All</option>
              <option value="Full-Time">Full Time</option>
              <option value="Part-Time">Part Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          {/* Minimum Salary */}

          <div className="job-filter-group">
            <label>
              <FaMoneyBillWave />
              Minimum Salary
            </label>

            <input
              type="number"
              name="minSalary"
              placeholder="₹ Minimum"
              value={filters.minSalary}
              onChange={filterChangeHandler}
            />
          </div>

          {/* Maximum Salary */}

          <div className="job-filter-group">
            <label>
              <FaMoneyBillWave />
              Maximum Salary
            </label>

            <input
              type="number"
              name="maxSalary"
              placeholder="₹ Maximum"
              value={filters.maxSalary}
              onChange={filterChangeHandler}
            />
          </div>

          {/* Sort */}

          <div className="job-filter-group">
            <label>
              <FaSortAmountDown />
              Sort By
            </label>

            <select
              name="sort"
              value={filters.sort}
              onChange={filterChangeHandler}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="salary-high">Highest Salary</option>
              <option value="salary-low">Lowest Salary</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>
        </div>

        <div className="job-filter-footer">
          <button
            type="button"
            className="job-filter-reset-btn"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default FilterBar;
