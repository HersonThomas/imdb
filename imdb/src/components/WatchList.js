import { useState } from "react";

let genreids = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function WatchList() {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchStr, setSearchStr] = useState("");
  const [sortState, setSortState] = useState(0);

  const watchList = JSON.parse(localStorage.getItem("imdb") || "[]");

  // Need to filter out movies by the selected genre, if selectedGenre is not null
  const watchListFiltered = watchList.filter((item) => {
    // figure out if this item contains this genre
    const genreIds = item.genre_ids;
    const genreNames = genreIds.map((id) => genreids[id]);

    return selectedGenre ? genreNames.includes(selectedGenre) : true;
  });

  const watchListFilteredAndSearched = watchListFiltered.filter((item) => {
    return item.original_title.toLowerCase().includes(searchStr);
  });

  let watchListFilteredAndSearchedandSorted = watchListFilteredAndSearched;

  if (sortState == 1) {
    // This means that we are sorting by rating, in ascending
    watchListFilteredAndSearchedandSorted =
      watchListFilteredAndSearchedandSorted.sort((objA, objB) => {
        return objB.vote_average - objA.vote_average;
      });
  }

  if (sortState == -1) {
    // This means that we are sorting by rating, in descending
    watchListFilteredAndSearchedandSorted =
      watchListFilteredAndSearchedandSorted.sort((objA, objB) => {
        return objA.vote_average - objB.vote_average;
      });
  }
  const reducedGenre = watchList.reduce((acc, elem) => {
    console.log({ elem, gendre: elem.genreids });
    acc.push(...elem.genre_ids);

    return acc;
  }, []);

  const genreNamesSet = new Set(
    reducedGenre.map((genreItem) => genreids[genreItem])
  );

  return (
    // React fragment
    <>
      <div className="mt-6 flex space-x-2 justify-center">
        {Array.from(genreNamesSet).map((name) => (
          <button
            key={name}
            onClick={() => {
              setSelectedGenre(name);
            }}
            className={
              selectedGenre === name
                ? "m-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold"
                : "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
            }
          >
            {name}
          </button>
        ))}
        <button
          key="reset"
          onClick={() => {
            setSelectedGenre(null);
          }}
          className={
            "m-2 text-lg p-1 px-2 bg-red-400 text-white rounded-xl font-bold"
          }
        >
          Reset
        </button>
      </div>

      <div className="text-center">
        <input
          type="text"
          className="border bg-gray-200 border-4 text-center p-1 m-2"
          placeholder="Search for Movies"
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
        />
      </div>

      <div className="rounded-lg border border-gray-200 m-5 shadow-md">
        <table className="w-full bg-white text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>
                <div class="flex space-x-2">
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                    className="mr-1"
                    onClick={() => {
                      setSortState(1);
                    }}
                  />
                  Ratings
                  <img
                    src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                    className="mr-1"
                    onClick={() => {
                      setSortState(-1);
                    }}
                  />
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody className="border text-center">
            {watchListFilteredAndSearchedandSorted.map((watchListItem) => (
              <tr key={watchListItem.id} className="hover:bg-gray-50">
                <td>{watchListItem.original_title}</td>
                <td>
                  <div
                    className="h-[10rem] w-[10rem] bg-cover"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/t/p/w500/${watchListItem.poster_path})`,
                    }}
                  ></div>
                </td>
                <td>{watchListItem.vote_average}</td>
                <td>{watchListItem.popularity}</td>
                <td>
                  {watchListItem.genre_ids.map((id) => genreids[id]).join(",")}
                </td>
                <td>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
