import Banner from "./components/Banner";
import NavBar from "./components/NavBar";
import Movies from "./components/Movies";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import WatchList from "./components/WatchList";

// Discuss Loader here

function App() {
  return (
    <BrowserRouter>

    <div className="App">
      <NavBar />
      <Routes>
        <Route
            path="/"
            element={
              // React Fragment
              <>
                <Banner />
                <Movies />
              </>
            }
          />

          <Route
            path="/watchlist"
            element={
              // React Fragment
              <>
                <WatchList />
              </>
            }
          />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
