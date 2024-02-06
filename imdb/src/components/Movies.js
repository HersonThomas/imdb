import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

// Make a request to our API endpoint
// Get the response
// Use the response to store the list of movies in our component

function Movies() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [watchList, setWatchList] = useState(
    JSON.parse(localStorage.getItem("imdb") || "[]")
  );
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(movies);

  const getAllMovies = async () => {
    setLoading(true);
    // Making an API request
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=ed9945885ba0c6f7a7edc57b379191ae&page=${currentPage}`
    );
    const moviesResponse = response.data.results;

    // Now that I have received my movies, I can set my local state
    // to the list of movies
    setMovies(moviesResponse);
    setLoading(false);
  };

  const decreasePageNo = () => {
    console.log("Decreased");
    // Chek if page no if greater than 1
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    // decrease page no by 1
  };

  const increasePageNo = () => {
    console.log("Increased");
    setCurrentPage(currentPage + 1);
    // increase page no by 1
  };

  const resetPageNo = () => {
    setCurrentPage(1);
  };

  // Run this effect only when currentPage changes
  useEffect(() => {
    getAllMovies();
  }, [currentPage]);

  const addToWatchList = (movie) => {
    const newWatchList = [...watchList];
    newWatchList.push(movie);

    // add it to localStorage
    localStorage.setItem("imdb", JSON.stringify(newWatchList));

    setWatchList(newWatchList);
  };

  const removeFromWatchList = (movie) => {
    const newWatchList = watchList.filter((movieCurrent) => {
      return movieCurrent.id !== movie.id;
    });

    localStorage.setItem("imdb", JSON.stringify(newWatchList));

    setWatchList(newWatchList);
  };

  const watchListIds = watchList.map((movie) => movie.id);

  return (
    <div>
      <div className="text-2xl mt-4 mb-8 font-bold text-center">
        Trending Movies
      </div>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div>Loading</div>
        ) : (
          movies.map((movie) => {
            return (
              <div
                onMouseOver={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${movie.poster_path})`,
                }}
                key={movie.id}
                className="overflow-hidden w-[250px] h-[30vh] bg-center bg-cover m-4 md:h-[35vh] md:w-[250px] flex items-end rounded-xl hover:scale-110 duration-300 relative"
              >
                {/* // Check if movie is present in watchlist
                        // If present, display remove increasePageNo
                        // Else display + icon */}
                <div
                  style={{
                    visibility:
                      movie.id === hoveredMovie ? "visible" : "hidden",
                  }}
                  className="text-2xl p-2 bg-gray-900 text-white absolute left-2 top-2 bg-opacity-70 "
                >
                  {watchListIds.includes(movie.id) ? (
                    <div onClick={() => removeFromWatchList(movie)}>
                      <div> - </div>
                    </div>
                  ) : (
                    <div onClick={() => addToWatchList(movie)}>
                      <div> 😍 </div>
                    </div>
                  )}
                </div>

                <div className="text-white font-bold text-center w-full bg-gray-900 bg-opacity-60">
                  {movie.title}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Discuss Loader Here */}

      <Pagination
        resetPageNo={resetPageNo}
        decreasePageNo={decreasePageNo}
        increasePageNo={increasePageNo}
        page={currentPage}
      />
    </div>
  );
}

export default Movies;
