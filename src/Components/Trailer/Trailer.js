import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Trailer.css";

const apiKey = `${process.env.REACT_APP_API_KEY}`;

const Trailer = () => {
  const [movies, setMovies] = useState([]);
  const [filterIndex, setFilterIndex] = useState(0);
  const [movieTrailers, setMovieTrailers] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);
  const [hovered, setHovered] = useState(null);

  const filters = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_watch_providers=8%7C337%7C386%7C15&watch_region=US&language=en`,
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}&language=en`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=US&with_watch_monetization_types=rent`,
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&region=US&with_release_type=3%7C2`,
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(filters[filterIndex]);
        const movies = response.data.results;
        const movieIds = movies.map((item) => item.id);
        const trailerPromises = movieIds.map(async (movieId) => {
          let res;
          if (filterIndex === 2) {
            res = await axios.get(
              `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=${apiKey}&language=en`
            );
          } else {
            res = await axios.get(
              `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en`
            );
          }
          const trailers = res.data.results;
          if (trailers.length > 0) {
            let title;
            if (filterIndex === 2) {
              const tvShowResponse = await axios.get(
                `https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}&language=en`
              );
              title = tvShowResponse.data.name;
            } else {
              title = movies.find((movie) => movie.id === movieId).title;
            }
            return {
              pic: trailers[0].poster_path,
              id: trailers[0].id,
              key: trailers[0].key,
              title: title,
            };
          }
          return null;
        });
        const fetchedTrailers = await Promise.all(trailerPromises);
        const filteredTrailers = fetchedTrailers.filter(
          (trailer) => trailer !== null
        );
        setMovies(movieIds);
        setMovieTrailers(filteredTrailers);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [filterIndex]);

  const handleFilter = (index) => {
    setFilterIndex(index);
  };

  const TrailerModal = ({ trailer, onClose }) => {
    if (!trailer) {
      return null;
    }
    return (
      <div className="trailer_modal">
        <div className="trailer_modal_content">
          <button className="trailer_modal_close" onClick={onClose}>
            X
          </button>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            allowFullScreen
            className="trailer_modal_iframe"
            loading="lazy"
            title={trailer.title}
          ></iframe>
        </div>
      </div>
    );
  };

  return (
    <div
      className="trailerall_container"
      style={{
        backgroundImage: hovered ? `url(${hovered})` : "",
      }}
    >
      <div className="trailer_heading_container">
        <div className="trailer_text">Latest Trailers</div>
        <div className="trailer_button_container">
          <button
            className={filterIndex === 0 ? "active" : ""}
            onClick={() => handleFilter(0)}
          >
            Popular
          </button>

          <button
            className={filterIndex === 2 ? "active" : ""}
            onClick={() => handleFilter(2)}
          >
            On TV
          </button>

          <button
            className={filterIndex === 4 ? "active" : ""}
            onClick={() => handleFilter(4)}
          >
            In Theaters
          </button>
        </div>
      </div>
      <div className="trailer_card_container">
        {movieTrailers.map((trailer) => {
          // console.log(trailer);
          return (
            <div
              className={`trailer_movie_card ${selectedTrailer && "clickable"}`}
              key={trailer.id}
              onClick={() => setSelectedTrailer(trailer)}
              onMouseEnter={() =>
                setHovered(
                  `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`
                )
              }
              onMouseLeave={() => setHovered(null)}
            >
              <div className="trailer_img_container">
                <img
                  src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                  alt={trailer.title}
                  className="trailer_img"
                />
                <div
                  className="trailer_card_background"
                  style={{
                    backgroundImage: `url(https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg)`,
                  }}
                />
                <div className="trailer_play_button">
                  <img
                    src="https://cdn.pixabay.com/photo/2021/10/09/12/45/play-button-6694069_1280.png"
                    className="play_button"
                    alt="Play button"
                  />
                </div>
              </div>
              <div className="trailer_title">{trailer.title}</div>
            </div>
          );
        })}
      </div>
      <TrailerModal
        trailer={selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
      />
    </div>
  );
};
export default Trailer;
