import styles from "../Styles/Videos.module.css";

export const ShowVideos = ({ data }) => {
  return (
    <>
      {data && data.videos && data.videos.results.length > 0 ? (
        <div className={styles["video-container"]}>
          <h2>
            Videos{" "}
            <span style={{ fontSize: "0.8em", color: "rgb(148, 147, 147)" }}>
              {data && data.videos && data.videos.results.length}
            </span>
          </h2>
          <div className={styles["video-wrapper"]}>
            {data &&
              data.videos &&
              data.videos.results.map((el, index) => (
                <iframe
                  key={index}
                  className={styles.video}
                  src={`https://www.youtube.com/embed/${el.key}`}
                  title={data.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};
