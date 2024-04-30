import { useEffect, useState } from "react";
import styles from "./Styles/Popular.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Styles/TrendingSlick.css";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { Skeleton } from "@mui/material";

const token = `${process.env.REACT_APP_TOKEN}`;

//https://api.themoviedb.org/3/tv/popular
// https://api.themoviedb.org/3/movie/popular

const Popular = () => {
  const [result, setResult] = useState();
  const [config, setConfig] = useState();
  const [loading, setLoading] = useState();
  const [movie_Tv, setMovie_Tv] = useState(false);

  useEffect(() => {
    getPopularMovie();
    // setMovie(true);
    setMovie_Tv(true);
  }, []);

  async function getPopularMovie() {
    setLoading(true);

    try {
      const configRes = await fetch(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const configData = await configRes.json();

      setConfig({
        baseURL: configData.images.secure_base_url,
        posterSize: configData.images.still_sizes[2],
        backdropSize: configData.images.backdrop_sizes[3],
      });

      const movieRes = await fetch(
        "https://api.themoviedb.org/3/movie/popular",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const movieData = await movieRes.json();

      setResult(movieData.results);
    } catch (error) {
      console.log("Error fetching popular movie: ", error);
    } finally {
      setLoading(false);
    }
  }

  async function getPopularShows() {
    setLoading(true);
    try {
      const showRes = await fetch("https://api.themoviedb.org/3/tv/popular", {
        headers: {
          Authorization: token,
        },
      });
      const showData = await showRes.json();

      setResult(showData.results);
    } catch (error) {
      console.log("Error fetching popular show: ", error);
    } finally {
      setLoading(false);
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 4,
    variableWidth: true,
    rows: 1,
    pauseOnFocus: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  function handleMovieClick() {
    setMovie_Tv(true);
    getPopularMovie();
  }

  function handleShowClick() {
    setMovie_Tv(false);
    getPopularShows();
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h2>What's Popular</h2>

        <div className={styles.btnContainer}>
          <button
            onClick={handleMovieClick}
            className={styles.movieBtn}
            style={{
              backgroundColor: movie_Tv ? "#762ab2" : null,
              color: movie_Tv ? "#5bdff9" : null,
            }}
          >
            Movies
          </button>
          <button
            onClick={handleShowClick}
            className={styles.showBtn}
            style={{
              backgroundColor: movie_Tv ? null : "#762ab2",
              color: movie_Tv ? null : "#5bdff9",
            }}
          >
            TV Shows
          </button>
        </div>
      </div>
      {loading ? (
        <div className={styles.skeletonDiv}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <>
          {result && result.length > 0 ? (
            <div className={styles.sliderContainer}>
              <Slider {...settings}>
                {result.map((el) => {
                  if (el.title) {
                    return (
                      <Link
                        to={`/movies/${el.id}`}
                        style={{ display: "block", width: "100px" }}
                        key={el.id}
                      >
                        <Badge
                          badgeContent={Math.round(el.vote_average * 10) / 10}
                          color="primary"
                        >
                          <img
                            key={el.id}
                            className={styles.poster}
                            src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                            alt={el.title}
                          />
                        </Badge>
                      </Link>
                    );
                  } else {
                    return (
                      <Link
                        to={`/shows/${el.id}`}
                        style={{ display: "block", width: "100px" }}
                        key={el.id}
                      >
                        <Badge
                          badgeContent={Math.round(el.vote_average * 10) / 10}
                          color="primary"
                        >
                          <img
                            key={el.id}
                            className={styles.poster}
                            src={`${config.baseURL}${config.posterSize}${el.poster_path}`}
                            alt={el.name}
                          />
                        </Badge>
                      </Link>
                    );
                  }
                })}
              </Slider>
            </div>
          ) : (
            <p>No result</p>
          )}
        </>
      )}
    </div>
  );
};

export default Popular;
