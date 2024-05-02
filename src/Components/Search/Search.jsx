import { useEffect, useRef, useState } from "react";
import styles from "../Styles/Search.module.css";
import defaultPoster from "../Images/defaultPoster.jpg";
import { Link } from "react-router-dom";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { Badge } from "@mui/material";
import { RiArrowLeftDoubleFill, RiArrowRightDoubleFill } from "react-icons/ri";

const token = `${process.env.REACT_APP_TOKEN}`;

const Search = () => {
  const [config, setConfig] = useState({});
  const [result, setResult] = useState({});
  const [type, setType] = useState("movie");
  const [userInput, setUserInput] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    multiSearch(page, type);
  }, [page, type]);

  const multiSearch = async (page, type) => {
    try {
      const configResponse = await fetch(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const configResult = await configResponse.json();
      setConfig({
        baseURL: configResult.images.secure_base_url,
        posterSize: configResult.images.still_sizes[2],
        backdropSize: configResult.images.backdrop_sizes[3],
      });

      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/${type}?query=${userInput}&language=en-US&page=${page}`, //&include_adult=${adult}
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const searchResult = await searchResponse.json();
      // console.log(searchResult);

      setResult(searchResult);
    } catch (error) {
      console.log(error, "error");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setPage(1);
    multiSearch(1, type);
  }

  function handleNextPage(e) {
    e.preventDefault();
    setPage((p) => p + 1);
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }

  function handlePrevPage(e) {
    e.preventDefault();
    setPage((p) => p - 1);
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }

  function handleToFirstPage(e) {
    e.preventDefault();
    setPage(1);
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }

  function handleToLastPage(e) {
    e.preventDefault();
    setPage(result.total_pages);
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }

  function handleMoviesTab(e) {
    setType("movie");
    setPage(1);
    multiSearch(1, type);
  }

  function handleShowsTab(e) {
    setType("tv");
    setPage(1);
    multiSearch(1, type);
  }

  function handleEnterPoster(e) {
    e.currentTarget.style.opacity = 1;
  }

  function handleLeavePoster(e) {
    e.currentTarget.style.opacity = 0;
  }

  return (
    <div className={styles.container}>
      <div className={styles.input_submit_container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            value={userInput}
            placeholder="Search movies and shows..."
            name="userInput"
            className={styles.inputBar}
          />
          <button type="submit">Search</button>
        </form>

        <div className={styles.tabs}>
          <button
            onClick={handleMoviesTab}
            style={{
              borderBottom: type === "movie" ? "2px solid white" : "none",
            }}
          >
            Movies
          </button>
          <button
            onClick={handleShowsTab}
            style={{
              borderBottom: type === "tv" ? "2px solid white" : "none",
            }}
          >
            TV Shows
          </button>
        </div>
      </div>

      <div className={styles.wrapper}>
        {result?.results?.length > 0 ? (
          <>
            {result.results &&
              result.results.map((el) =>
                el.title ? (
                  <Link key={el.id} to={`/movies/${el.id}`}>
                    <Badge
                      badgeContent={Math.round(el.vote_average * 10) / 10}
                      color={el.vote_average > 7 ? "secondary" : "primary"}
                    >
                      <div className={styles.posterContainer}>
                        <img
                          src={
                            el.poster_path !== null
                              ? `${config.baseURL}${config.posterSize}${el.poster_path}`
                              : `${defaultPoster}`
                          }
                          alt={el.title}
                          className={styles.poster}
                        />

                        <div
                          className={styles.info}
                          onMouseEnter={handleEnterPoster}
                          onMouseLeave={handleLeavePoster}
                        >
                          <p>{el.title}</p>
                          <p>
                            {new Date(el.release_date).getFullYear() || "N/A"}
                          </p>
                        </div>
                      </div>
                    </Badge>
                  </Link>
                ) : (
                  <Link key={el.id} to={`/shows/${el.id}`}>
                    <Badge
                      badgeContent={Math.round(el.vote_average * 10) / 10}
                      color={el.vote_average > 7 ? "secondary" : "primary"}
                    >
                      <div className={styles.posterContainer}>
                        <img
                          src={
                            el.poster_path !== null
                              ? `${config.baseURL}${config.posterSize}${el.poster_path}`
                              : `${defaultPoster}`
                          }
                          alt={el.name}
                          className={styles.poster}
                        />

                        <div
                          className={styles.info}
                          onMouseEnter={handleEnterPoster}
                          onMouseLeave={handleLeavePoster}
                        >
                          <p>{el.name}</p>
                          <p>
                            {new Date(el.first_air_date).getFullYear() || "N/A"}
                          </p>
                        </div>
                      </div>
                    </Badge>
                  </Link>
                )
              )}
          </>
        ) : (
          "No Media Found"
        )}
      </div>

      {result.results && (
        <div className={styles.pageDiv}>
          {result.page !== 1 ? (
            <RiArrowLeftDoubleFill
              onClick={handleToFirstPage}
              className={styles.firstPageBtn}
            />
          ) : null}
          {result.page !== 1 ? (
            <GrFormPrevious
              onClick={handlePrevPage}
              className={styles.prevBtn}
            />
          ) : null}
          {result?.results?.length > 0 ? (
            <p>
              Page {result.page} of {result.total_pages}
            </p>
          ) : null}

          {result.total_pages !== result.page ? (
            <GrFormNext onClick={handleNextPage} className={styles.nextBtn} />
          ) : null}
          {result.total_pages !== result.page ? (
            <RiArrowRightDoubleFill
              onClick={handleToLastPage}
              className={styles.lastPageBtn}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Search;
