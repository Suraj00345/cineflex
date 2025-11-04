import React, { useEffect, useState, useRef } from "react";
import { useMovies } from "../context/MovieContext";
import { getImageURL, searchMovies } from "../services/api";

const Navbar = () => {
  const { openMoviesDetails } = useMovies();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResult, setShowSearchResults] = useState(false);
  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQuery);
          setSearchResult(result ? result.slice(0, 5) : []);
        } catch (error) {
          console.log("error searching movies", error);
        } finally {
          setIsSearching(false);
          setShowSearchResults(true);
        }
      } else {
        setSearchResult([]);
        setShowSearchResults(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResults(true);
    }
  };

  const handleClickOutSide = (e) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(e.target)
    ) {
      setShowSearchResults(false);
    }
  };

  const handleMovieSelect = (movieId) => {
    openMoviesDetails(movieId);
    setShowSearchResults(false);
    setSearchQuery("");
  };
  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-purple-500 font-bold text-3xl">
                Cine <span className="text-white -ml-2">Flex</span>
              </span>
            </a>
          </div>
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Home
            </a>
            <a
              href="#tranding"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Tranding
            </a>
            <a
              href="#popular"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Top Rated
            </a>
          </nav>
          {/* Desktop search */}
          <div
            className="hidden md:block relative search-container"
            ref={searchContainerRef}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search movies ....."
                className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />

              {/* conditional rendering */}
              {isSearching && (
                <div className="absolute right-3 top-2.5">
                  <svg
                    className="w-4 h-4 text-neutral-400 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
            </div>

            {/*search result dropdown conditional rendering  */}
            {showSearchResult && searchResult && searchResult.length > 0 && (
              <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                <ul className="divide-y divide-neutral-700">
                  {/* map method */}
                  {searchResult.map((movie) => {
                    return (
                      <li className="hover:bg-neutral-700">
                        <button
                          className="flex items-center p-3 w-full text-left"
                          onClick={() => handleMovieSelect(movie.id)}
                        >
                          <div className="w-10 h-14 bg-neutral-700 rounded overflow-hidden shrink-0">
                            {/* conditional Rendering */}
                            {movie.poster_path ? (
                              <img
                                src={getImageURL(movie.poster_path, "w92")}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-white truncate">
                              {movie.title}
                            </p>
                            <p className="text-xs text-neutral-400">
                              {movie.release_date?.substring(0, 4) || "N/A"}
                            </p>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Conditional Rendering */}
            {showSearchResult &&
              searchQuery.trim().length > 2 &&
              (!searchResult || searchResult.length === 0) &&
              !isSearching && (
                <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <div className="p-4 text-center w-full text-neutral-400 text-sm">
                    No Movies Found matching......
                  </div>
                </div>
              )}
          </div>

          {/* mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {/* conditional Rendering */}
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu-icon lucide-menu"
              >
                <path d="M4 5h16" />
                <path d="M4 12h16" />
                <path d="M4 19h16" />
              </svg>
            )}
          </button>
        </div>

        {/* mobile navigation conditional rendering */}
        {isMobileMenuOpen && (
          <div className="flex flex-col space-y-4 mt-4 md:hidden">
            <a
              href="#"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Home
            </a>
            <a
              href="#tranding"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Tranding
            </a>
            <a
              href="#popular"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Popular
            </a>
            <a
              href="#top-rated"
              className="text-white hover:text-purple-400 transition-all font-medium"
            >
              Top Rated
            </a>

            <div
              className="relative mt-3 search-container"
              ref={searchContainerRef}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                placeholder="Search movies....."
                className="bg-neutral-800/80 text-white px-4 py-2 rounded-full text-sm w-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
              {/* conditional rendring */}
              {showSearchResult && searchResult && searchResult.length > 0 && (
                <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                  <ul className="divide-y divide-neutral-700">
                    {/* map method */}
                    {searchResult.map((movie) => {
                      return (
                        <li className="hover:bg-neutral-700">
                          <button
                            className="flex items-center p-3 w-full text-left"
                            onClick={() => handleMovieSelect(movie.id)}
                          >
                            <div className="w-10 h-14 bg-neutral-700 rounded overflow-hidden shrink-0">
                              {/* conditional Rendering */}
                              {movie.poster_path ? (
                                <img
                                  src={getImageURL(movie.poster_path)}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                                  No Image
                                </div>
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-white truncate">
                                {movie.title}
                              </p>
                              <p className="text-xs text-neutral-400">
                                {movie.release_date?.substring(0, 4) || "N/A"}
                              </p>
                            </div>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* conditional rendring */}
              {showSearchResult &&
                searchQuery.trim().length > 2 &&
                (!searchResult || searchResult.length === 0) &&
                !isSearching && (
                  <div className="absolute mt-2 w-full bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                    <div className="p-4 text-center w-full text-neutral-400 text-sm">
                      No Movies Found matching......
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
