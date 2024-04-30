import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useFirestore } from "../services/firestore";
import Tooltip from "@mui/material/Tooltip";
import { useState, useEffect } from "react";
import styles from "./Styles/WatchlistCard.module.css";
import { BiSolidStar } from "react-icons/bi";
import { FaSquareMinus } from "react-icons/fa6";

const token = `${process.env.REACT_APP_TOKEN}`;

export const WatchlistCard = ({ item, setWatchlist }) => {
  const [config, setConfig] = useState({});
  const { removeFromWatchlist } = useFirestore();
  const { user } = useAuth();

  const configFunc = async () => {
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
  };

  useEffect(() => {
    configFunc();
  }, []);

  const handleRemoveClick = (e) => {
    e.preventDefault();
    removeFromWatchlist(user.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id));
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        {item.title ? (
          <>
            <div className={styles.left}>
              <Link to={`/movies/${item.id}`}>
                <img
                  alt={item.id}
                  src={`${config.baseURL}${config.posterSize}${item.poster_path}`}
                  className={styles.poster}
                />
              </Link>
            </div>

            <div className={styles.right}>
              <h3>
                {item.title}{" "}
                <Tooltip title="Remove from watchlist">
                  <div
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "inline-block",
                    }}
                  >
                    <FaSquareMinus
                      className={styles.removeBtn}
                      onClick={handleRemoveClick}
                    />
                  </div>
                </Tooltip>
              </h3>

              <div className={styles.dateAndRating}>
                <p className={styles.date}>
                  {new Date(item.release_date).getFullYear()}
                </p>
                <p>
                  <BiSolidStar
                    style={{ color: "yellow", verticalAlign: "-12%" }}
                  />{" "}
                  {Math.round(item.vote_average * 10) / 10}
                </p>
              </div>

              <p className={styles.overview}>{item.overview}</p>
            </div>
          </>
        ) : (
          <>
            <div className={styles.left}>
              <Link to={`/shows/${item.id}`}>
                <img
                  alt={item.id}
                  src={`${config.baseURL}${config.posterSize}${item.poster_path}`}
                  className={styles.poster}
                />
              </Link>
            </div>

            <div className={styles.right}>
              <h3>
                {item.name}{" "}
                <Tooltip title="Remove from watchlist">
                  <div
                    style={{
                      width: "fit-content",
                      height: "fit-content",
                      display: "inline-block",
                    }}
                  >
                    <FaSquareMinus
                      className={styles.removeBtn}
                      onClick={handleRemoveClick}
                    />
                  </div>
                </Tooltip>
              </h3>

              <div className={styles.dateAndRating}>
                <p className={styles.date}>
                  {new Date(item.first_air_date).getFullYear()}
                </p>
                <p>
                  <BiSolidStar
                    style={{ color: "yellow", verticalAlign: "-12%" }}
                  />{" "}
                  {Math.round(item.vote_average * 10) / 10}
                </p>
              </div>

              <p className={styles.overview}>{item.overview}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};
