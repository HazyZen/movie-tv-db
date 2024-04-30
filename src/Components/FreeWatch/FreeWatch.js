import React, { useEffect, useState } from "react";
import "./FreeWatch.css";
import axios from "axios";
import { Link } from "react-router-dom";

const apiKey = `${process.env.REACT_APP_API_KEY}`;

const FreeWatch = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("movie");

  useEffect(() => {
    const fetchFreeContent = async () => {
      let url = "";

      if (filter === "movie") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_watch_providers=8`;
      } else if (filter === "tv") {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_watch_providers=8`;
      }

      try {
        const res = await axios.get(url);
        const data = res.data.results;
        setMovies(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFreeContent();
  }, [filter]);

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <div className="free_container">
      <div className="heading_container">
        <div className="text">Free to Watch</div>
        <div className="button_container">
          <button
            className={filter === "movie" ? "active" : ""}
            onClick={() => handleFilter("movie")}
          >
            Movies
          </button>
          <button
            className={filter === "tv" ? "active" : ""}
            onClick={() => handleFilter("tv")}
          >
            TV
          </button>
        </div>
      </div>

      <div className="card_container">
        {movies.map((item) => (
          <div className="movie_card" key={item.id}>
            {item.title ? (
              <Link to={`/movies/${item.id}`} className="link">
                <div className="img_container">
                  <img
                    src={
                      item.poster_path
                        ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`
                        : "not.jpg"
                    }
                    className="movieimg"
                    alt="..."
                  />

                  <span
                    className="badge"
                    style={
                      Math.round(item.vote_average * 10) > 70
                        ? { boxShadow: "inset 0 0 0 3px green" }
                        : Math.round(item.vote_average * 10) > 50
                        ? { boxShadow: "inset 0 0 0 3px yellow" }
                        : { boxShadow: "inset 0 0 0 3px red" }
                    }
                  >
                    {Math.round(item.vote_average * 10)}%
                  </span>
                </div>

                <h5 className="movietitle">{item.title}</h5>
                <p className="movietext">{item.release_date}</p>
              </Link>
            ) : (
              <Link to={`/shows/${item.id}`} className="link">
                <div className="img_container">
                  <img
                    src={
                      item.poster_path
                        ? `https://www.themoviedb.org/t/p/w220_and_h330_face/${item.poster_path}`
                        : "not.jpg"
                    }
                    className="movieimg"
                    alt="..."
                  />

                  <span
                    className="badge"
                    style={
                      Math.round(item.vote_average * 10) > 70
                        ? { boxShadow: "inset 0 0 0 3px green" }
                        : Math.round(item.vote_average * 10) > 50
                        ? { boxShadow: "inset 0 0 0 3px yellow" }
                        : { boxShadow: "inset 0 0 0 3px red" }
                    }
                  >
                    {Math.round(item.vote_average * 10)}%
                  </span>
                </div>

                <h5 className="movietitle">{item.name}</h5>
                <p className="movietext">{item.first_air_date}</p>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreeWatch;
