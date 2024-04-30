import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Alert, Skeleton } from "@mui/material";
import styles from "../Styles/ShowPage.module.css";
import { PiTelevisionSimpleDuotone } from "react-icons/pi";
import { BiCalendar, BiSolidStar } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import ShowAbout from "./ShowAbout";
import RecommendShows from "./RecommendShows";
import { useAuth } from "../../context/useAuth";
import { useFirestore } from "../../services/firestore";
import { MdAdd, MdBookmarkAdded } from "react-icons/md";
import { ShowVideos } from "./ShowVideos";
import PlayShowTrailer from "./PlayShowTrailer";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function ShowPage() {
  const [data, setData] = useState({});
  const [config, setConfig] = useState({});
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alertUser, setAlertUser] = useState(false);

  const { id } = useParams();

  const { user } = useAuth();
  const {
    addToWatchlist,
    checkIfInWatchlist,
    removeFromWatchlist,
    alertComponent,
  } = useFirestore();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    getShowById();
  }, []);

  async function getShowById() {
    setLoading(true);
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const apiConfig = await response.json();

      const res = await fetch(
        `https://api.themoviedb.org/3/tv/${id}?append_to_response=credits,videos`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const result = await res.json();

      setConfig({
        baseURL: apiConfig.images.secure_base_url,
        backdropSize: apiConfig.images.backdrop_sizes[2],
        posterSize: apiConfig.images.still_sizes[2],
        profileSize: apiConfig.images.profile_sizes[1],
      });
      setData(result);

      let youtubeVids = Object.values(result.videos.results);
      setTrailers(youtubeVids);
      // console.log(result);
    } catch (error) {
      console.log("Get show error", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveToWatchlist = async () => {
    if (!user) {
      setAlertUser(true);
      return;
    }

    const watchlistData = {
      id: data.id,
      name: data.name,
      poster_path: data.poster_path,
      first_air_date: data.first_air_date,
      vote_average: data.vote_average,
      overview: data.overview,
    };

    // console.log(watchlistData, "data");
    // addDocument("watchlist", watchlistData);

    const dataId = data.id.toString();
    await addToWatchlist(user.uid, dataId, watchlistData);
    const isSetToWatchlist = await checkIfInWatchlist(user.uid, dataId);
    setIsInWatchlist(isSetToWatchlist);
  };

  useEffect(() => {
    let alertTimer;

    if (alertUser) {
      alertTimer = setTimeout(function () {
        setAlertUser(false);
      }, 3000);
    }

    return () => {
      clearTimeout(alertTimer);
    };
  }, [alertUser]);

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false);
      return;
    }

    checkIfInWatchlist(user.uid, data.id).then((watchlistData) => {
      setIsInWatchlist(watchlistData);
    });
  }, [checkIfInWatchlist, data.id, user]);

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user.uid, data.id);
    const isSetToWatchlist = await checkIfInWatchlist(user.uid, data.id);
    setIsInWatchlist(isSetToWatchlist);
  };

  return loading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Skeleton
        variant="rounded"
        width={200}
        height={300}
        sx={{ bgcolor: "grey.900" }}
        style={{
          margin: "20px 50px",
          borderRadius: "8px",
        }}
      />
      <div>
        <Skeleton
          variant="text"
          width={450}
          height={50}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="text"
          width={370}
          height={50}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="text"
          width={80}
          height={20}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
        <Skeleton
          variant="text"
          width={160}
          height={20}
          sx={{ bgcolor: "grey.900" }}
          style={{
            margin: "10px",
            borderRadius: "8px",
          }}
        />
      </div>
    </div>
  ) : (
    <>
      <div
        className={styles.backdrop}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.5) , rgba(0,0,0,.5)), url(${config.baseURL}${config.backdropSize}${data.backdrop_path})`,
        }}
      >
        <div className={styles.wrapper} key={data.id}>
          <div className={styles.left}>
            <img
              style={{
                width: "250px",
                height: "auto",
                borderRadius: "5px",
              }}
              src={`${config.baseURL}${config.posterSize}${data.poster_path}`}
              alt={data.name}
            />
          </div>
          <div className={styles.right}>
            <div className={styles.titleSection}>
              <h2 className={styles.name}>
                {data.name}{" "}
                <span style={{ color: "#bababa", fontSize: "0.9em" }}>
                  {data.first_air_date && data.first_air_date.slice(0, 4)}
                </span>
              </h2>

              <ul className={styles.info}>
                <li key="date">
                  <BiCalendar style={{ verticalAlign: "-12%" }} />{" "}
                  {data.first_air_date &&
                    new Date(data.first_air_date).toLocaleDateString("en-US")}
                </li>
                <li key="seasons">
                  <PiTelevisionSimpleDuotone
                    style={{ verticalAlign: "-12%" }}
                  />{" "}
                  {data.number_of_seasons > 1
                    ? data.number_of_seasons + " Seasons"
                    : data.number_of_seasons + " Season"}
                </li>
                <li key="episodes">
                  <FaFilm style={{ verticalAlign: "-12%" }} />{" "}
                  {data.number_of_episodes > 1
                    ? data.number_of_episodes + " Episodes"
                    : data.number_of_episodes + " Episode"}
                </li>
                <li>
                  <BiSolidStar
                    style={{ color: "yellow", verticalAlign: "-12%" }}
                  />{" "}
                  {Math.round(data.vote_average * 10) / 10}
                </li>
              </ul>

              <hr />
            </div>

            {data.tagline ? (
              <p className={styles.tagline}>{data.tagline}</p>
            ) : null}

            <div className={styles.overviewContainer}>
              <h3>Overview</h3>
              <p className={styles.overview}>{data.overview}</p>
            </div>

            <div
              className={styles.buttons}
              style={{
                display: "flex",
                width: "fit-content",
                gap: "20px",
              }}
            >
              <PlayShowTrailer trailers={trailers} data={data} />

              {isInWatchlist ? (
                <div
                  className={styles.inWatchlist}
                  onClick={handleRemoveFromWatchlist}
                >
                  <MdBookmarkAdded
                    style={{
                      verticalAlign: "-12%",
                    }}
                  />{" "}
                  In Watchlist
                </div>
              ) : (
                <div
                  onClick={handleSaveToWatchlist}
                  className={styles.addToWatchlist}
                >
                  <MdAdd
                    style={{
                      verticalAlign: "-12%",
                    }}
                  />{" "}
                  Add to Watchlist
                </div>
              )}
            </div>

            <div>{alertComponent}</div>

            {alertUser ? (
              <Alert
                severity="error"
                style={{
                  position: "absolute",
                  bottom: "10px",
                }}
                variant="filled"
              >
                Login to add to watchlist
              </Alert>
            ) : null}

            <ul className={styles.genre}>
              {data.genres &&
                data.genres.map((genre) => (
                  <Link
                    to={`/shows/genre/${genre.id}`}
                    key={genre.id}
                    style={{
                      textDecoration: "none",
                      width: "fit-content",
                      height: "fit-content",
                      color: "white",
                    }}
                  >
                    <li>{genre.name}</li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <ShowAbout data={data} config={config} />

      <ShowVideos data={data} />

      <RecommendShows config={config} id={id} data={data} />
    </>
  );
}
