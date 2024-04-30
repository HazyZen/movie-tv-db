import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Styles/RecommendShows.module.css";
import defaultPoster from "../Images/defaultPoster.jpg";

const token = `${process.env.REACT_APP_TOKEN}`;

export default function RecommendShows({ config, id, data }) {
  const [recData, setRecData] = useState({});

  useEffect(() => {
    getRecommended();
  }, []);

  async function getRecommended() {
    try {
      const recResponse = await fetch(
        `https://api.themoviedb.org/3/tv/${id}/recommendations`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const recResult = await recResponse.json();

      setRecData(recResult);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className={styles.recContainer}>
        <h2>You May Also Like...</h2>
        {recData && recData.results && recData.results.length > 0 ? (
          <div className={styles.wrapper}>
            {recData &&
              recData.results &&
              recData.results.map((el) => {
                return (
                  <Link
                    to={`/shows/${el.id}`}
                    style={{
                      display: "block",
                      width: "100px",
                      cursor: "pointer",
                    }}
                    key={el.id}
                    reloadDocument
                  >
                    <img
                      key={el.id}
                      className={styles.showImg}
                      src={
                        el.poster_path !== null
                          ? `${config.baseURL}${config.posterSize}${el.poster_path}`
                          : `${defaultPoster}`
                      }
                      alt={el.name}
                    />
                    <p style={{ textAlign: "center" }}>{el.name}</p>
                  </Link>
                );
              })}
          </div>
        ) : (
          <p style={{ color: "white", paddingBottom: "20px" }}>
            We don't have enough data to suggest any movies based on{" "}
            {data && data.name}.
          </p>
        )}
      </div>
    </>
  );
}
