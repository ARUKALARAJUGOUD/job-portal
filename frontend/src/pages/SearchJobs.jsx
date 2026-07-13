import { useState } from "react";
import FilterBar from "../components/SearchJobs/FilterBar";
import JobCard from "../components/SearchJobs/JobCard";
import Pagination from "../components/SearchJobs/Pagination";
import SearchBar from "../components/SearchJobs/SearchBar";
import SearchHero from "../components/SearchJobs/SearchHero";

// import SearchHero from "../components/Search/SearchHero";
// import SearchBar from "../components/Search/SearchBar";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";
const SearchJobs = () => {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(false);

  const [totalJobs, setTotalJobs] = useState(0);

  // const [totalPages, setTotalPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword") || "";

  const pageChangeHandler = (page) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const [filters, setFilters] = useState({
    keyword,

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

  const filterChangeHandler = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await API.get("/job/search", {
          params: filters,
        });

        setJobs(response.data.jobs);

        setTotalPages(response.data.totalPages);

        setTotalJobs(response.data.totalJobs);
      } catch (error) {
        console.log(error);

        alert(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters]);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      keyword,
    }));
  }, [keyword]);

  return (
    <>
      <SearchHero />

      <SearchBar filters={filters} filterChangeHandler={filterChangeHandler} />
      <FilterBar
        filters={filters}
        filterChangeHandler={filterChangeHandler}
        setFilters={setFilters}
      />

      <div className="job-list">
        {jobs.map((job) => (
          <JobCard key={job._id} job={job} />
        ))}
      </div>

      <Pagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={pageChangeHandler}
      />
    </>
  );
};

export default SearchJobs;
