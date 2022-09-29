import React, { useEffect, useState } from "react";
import "./Components/style.css";
import { AnimeList } from "./Components/AnimeList";
import { AnimeDetails } from "./Components/AnimeDetails";
import { ListAddition } from "./Components/ListAddition";
import { ListRemoval } from "./Components/ListRemoval";

function App() {
  const [search, setSearch] = useState("Naruto"); // state variable to search txt with initial state val as 'Naruto'
  const [animeData, setAnimeData] = useState(); // state variable to hold response
  const [animeInfo, setAnimeInfo] = useState();
  const [myAnimeList, setMyAnimeList] = useState([]);

  const addTo = (anime) => {
    const index = myAnimeList.findIndex((myanime) => {
      return myanime.mal_id === anime.mal_id;
    });
    if (index < 0) {
      const newArray = [...myAnimeList, anime];
      setMyAnimeList(newArray);
    }
  };
  const removeFrom = (anime) => {
    const newArray = myAnimeList.filter((myanime) => {
      return myanime.mal_id !== anime.mal_id;
    });
    setMyAnimeList(newArray);
  };

  //Function to make the API request to fetch data
  const getData = async () => {
    // variable to store the response
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${search}&limit=20` // limit set to 20
    );

    // converting the response to JSON
    const resData = await res.json();
    setAnimeData(resData.data);
  };
  useEffect(() => {
    getData();
  }, [search]);

  return (
    <>
      {/* div for header and search bar */}
      <div className="header">
        <h1>MyAnimeList</h1>
        <div className="search-box">
          <input
            type="search"
            placeholder="Search your anime"
            onChange={(e) => setSearch(e.target.value)} // event to pass the search txt and return the user txt
          />
        </div>
      </div>

      {/* div for anime information list */}
      <div className="container">
        <div className="animeInfo">
          {animeInfo && <AnimeDetails animeInfo={animeInfo} />}
        </div>
        <div className="anime-row">
          <h2 className="text-heading">Anime</h2>
          <div className="row">
            <AnimeList
              animelist={animeData}
              setAnimeInfo={setAnimeInfo}
              animeComponent={ListAddition}
              handleList={(anime) => addTo(anime)}
            />
          </div>
          <h2 className="text-heading">My List</h2>
          <div className="row">
            <AnimeList
              animelist={myAnimeList}
              setAnimeInfo={setAnimeInfo}
              animeComponent={ListRemoval}
              handleList={(anime) => removeFrom(anime)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
