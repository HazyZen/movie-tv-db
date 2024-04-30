import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/ShowDiscover.module.css";
import { Button } from "@mui/material";
import Loading from "../Loading";
import defaultPoster from "../Images/defaultPoster.jpg";
import ScrollButton from "../ScrollButton";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function ShowDiscover() {
  const [config, setConfig] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    discoverShow(1);
  }, []);

  async function discoverShow(page) {
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

      setConfig({
        baseURL: apiConfig.images.secure_base_url,
        backdropSize: apiConfig.images.backdrop_sizes[2],
        posterSize: apiConfig.images.still_sizes[2],
      });

      if (page === 1) {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const result = await res.json();
        setData(result);
        setShowSpinner(false);
      } else if (page >= 2) {
        const res = await fetch(
          `https://api.themoviedb.org/3/discover/tv?page=${page}&sort_by=popularity.desc`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const result = await res.json();
        setData((prevData) => ({
          ...prevData,
          results: [...prevData.results, ...result.results],
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (page === 1) {
        setLoading(false);
      } else if (page > 1) {
        setShowSpinner(false);
      }
    }
  }

  function handleClickMore(e) {
    e.preventDefault();
    setShowSpinner(true);
    setPage(page + 1);
    discoverShow(page + 1);
  }

  return (
    <>
      <h2 className={styles.header}>Popular Shows</h2>
      <div className={styles.container}>
        {loading && !data.results ? (
          <Loading />
        ) : (
          <>
            {data.results &&
              data.results.map((el) => {
                return (
                  <div key={el.id} className={styles.showContainer}>
                    <Link
                      to={`/shows/${el.id}`}
                      style={{
                        textDecoration: "none",
                        width: "fit-content",
                        height: "fit-content",
                      }}
                      key={el.id}
                    >
                      <img
                        className={styles.poster}
                        src={
                          el.poster_path
                            ? `${config.baseURL}${config.posterSize}${el.poster_path}`
                            : `${defaultPoster}`
                        }
                        alt={el.name}
                      />
                    </Link>
                    <div className={styles.textContent}>
                      <Link
                        to={`/shows/${el.id}`}
                        style={{
                          textDecoration: "none",
                          width: "100%",
                          height: "fit-content",
                        }}
                        key={el.id}
                      >
                        <p className={styles.showName}>{el.name}</p>
                      </Link>
                      <p className={styles.overview}>
                        {!(el.overview === "")
                          ? el.overview.slice(0, 100).concat("...")
                          : null}
                      </p>
                      <p className={styles.date}>
                        {new Date(el.first_air_date)
                          .toDateString()
                          .slice(4)
                          .replaceAll(" ", "/")}
                      </p>
                    </div>
                  </div>
                );
              })}

            {!loading && data.results && (
              <>
                {showSpinner ? (
                  <Loading />
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleClickMore}
                    className={styles.loadMore}
                  >
                    Load More
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
      {data && (
        <p
          style={{
            padding: "5px",
            width: "fit-content",
            height: "fit-content",
            textAlign: "center",
            margin: "10px auto 20px",
          }}
        >
          Page {page} of {data.total_pages}
        </p>
      )}
      <ScrollButton />
    </>
  );
}
