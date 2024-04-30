import { useEffect, useState } from "react";
import styles from "../Styles/Videos.module.css";

export default function MovieVideos({ trailers, data }) {
  const [selectedType, setSelectedType] = useState("Trailer");

  useEffect(() => {
    filterVideos(selectedType);
  }, [selectedType]);

  const trailerCount = trailers.filter((el) => el.type === "Trailer").length;
  const clipCount = trailers.filter((el) => el.type === "Clip").length;
  const featuretteCount = trailers.filter(
    (el) => el.type === "Featurette"
  ).length;
  const teaserCount = trailers.filter((el) => el.type === "Teaser").length;
  const btsCount = trailers.filter(
    (el) => el.type === "Behind the Scenes"
  ).length;

  function filterVideos(type) {
    setSelectedType(type);
  }

  return (
    <>
      {data && data.videos && data.videos.results.length > 0 ? (
        <div className={styles["video-container"]}>
          <h2 className={styles.videoHeader}>
            Videos {trailers.length}
            {trailers && (
              <div className={styles.videoSelection}>
                <span
                  onClick={() => filterVideos("Trailer")}
                  style={{
                    color: selectedType === "Trailer" ? "#b361ed" : "",
                    borderBottom:
                      selectedType === "Trailer" ? "2px solid #b361ed" : "none",
                  }}
                >
                  Trailer {trailerCount}
                </span>

                <span
                  onClick={() => filterVideos("Clip")}
                  style={{
                    color: selectedType === "Clip" ? "#b361ed" : "",
                    borderBottom:
                      selectedType === "Clip" ? "2px solid #b361ed" : "none",
                  }}
                >
                  Clip {clipCount}
                </span>
                <span
                  onClick={() => filterVideos("Featurette")}
                  style={{
                    color: selectedType === "Featurette" ? "#b361ed" : "",
                    borderBottom:
                      selectedType === "Featurette"
                        ? "2px solid #b361ed"
                        : "none",
                  }}
                >
                  Featurette {featuretteCount}
                </span>
                <span
                  onClick={() => filterVideos("Teaser")}
                  style={{
                    color: selectedType === "Teaser" ? "#b361ed" : "",
                    borderBottom:
                      selectedType === "Teaser" ? "2px solid #b361ed" : "none",
                  }}
                >
                  Teaser {teaserCount}
                </span>
                <span
                  onClick={() => filterVideos("Behind the Scenes")}
                  style={{
                    color:
                      selectedType === "Behind the Scenes" ? "#b361ed" : "",
                    borderBottom:
                      selectedType === "Behind the Scenes"
                        ? "2px solid #b361ed"
                        : "none",
                  }}
                >
                  BTS {btsCount}
                </span>
              </div>
            )}
          </h2>
          <div className={styles["video-wrapper"]}>
            {data &&
              trailers.map((el, index) =>
                el.type === selectedType ? (
                  <iframe
                    key={index}
                    className={styles.video}
                    src={`https://www.youtube.com/embed/${el.key}`}
                    title={data.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  ></iframe>
                ) : null
              )}
          </div>
        </div>
      ) : null}
    </>
  );
}
