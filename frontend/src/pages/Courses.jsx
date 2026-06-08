import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../components/course/CourseCard.jsx";
import { useSearchParams } from "react-router-dom";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const [category, setCategory] = useState(searchParams.get("category") || "");

  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");

  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/api/courses", {
          params: {
            keyword: searchParams.get("keyword") || undefined,
            category: searchParams.get("category") || undefined,
            minPrice: searchParams.get("minPrice") || undefined,
            maxPrice: searchParams.get("maxPrice") || undefined,
          },
        });

        setCourses(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchParams]);

  const handleFilter = () => {
    const params = {};

    if (keyword.trim()) params.keyword = keyword;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;

    setSearchParams(params);
  };

  const clearFilters = () => {
    setKeyword("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");

    setSearchParams({});
  };

  return (
    <div className="bg-light min-vh-100">
      <section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #0b132b 0%, #1c2541 100%)",
        }}
      >
        <div className="container py-3">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <span className="badge bg-info-subtle text-info-emphasis mb-3">
                Explore Our Catalog
              </span>

              <h1 className="display-5 fw-bold mb-3">Find your next course</h1>

              <p className="lead text-white-50 mb-0">
                Browse practical, career-focused learning paths taught by
                mentors and industry professionals.
              </p>
            </div>

            <div className="col-lg-4">
              <div className="bg-white bg-opacity-10 rounded-4 p-4 border border-white border-opacity-10">
                <p className="small text-uppercase text-white-50 mb-2">
                  Total Courses
                </p>

                <p className="display-6 fw-bold mb-0">{courses.length}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container position-relative">
        <div className="card border-0 shadow-sm" style={{ marginTop: "-30px" }}>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-12 col-lg-4">
                <label className="form-label fw-semibold">Search Courses</label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="React, Node, AI..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <label className="form-label fw-semibold">Category</label>

                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">All Categories</option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6 col-lg-2">
                <label className="form-label fw-semibold">Min Price</label>

                <input
                  type="number"
                  className="form-control"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>

              <div className="col-6 col-lg-2">
                <label className="form-label fw-semibold">Max Price</label>

                <input
                  type="number"
                  className="form-control"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>

              <div className="col-12 col-lg-1 d-flex align-items-end">
                <button
                  className="btn btn-primary w-100"
                  onClick={handleFilter}
                >
                  Go
                </button>
              </div>
            </div>

            <div className="mt-3">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
          {loading && (
            <div className="alert alert-light border text-center shadow-sm">
              Loading courses...
            </div>
          )}

          {!loading && courses.length === 0 && (
            <div className="alert alert-light border text-center shadow-sm">
              No courses match your filters.
            </div>
          )}

          {!loading && courses.length > 0 && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">
                  Showing {courses.length} course
                  {courses.length !== 1 ? "s" : ""}
                </h5>
              </div>

              <div className="row g-4">
                {courses.map((course) => (
                  <div key={course._id} className="col-12 col-md-6 col-xl-4">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
