import { BiPlayCircle } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import styles from "../Styles/PlayTrailer.module.css";

export default function PlayMovieTrailer({ data, trailers }) {
  const [modal, setModal] = useState(false);

  function handleTrailer() {
    setModal(!modal);
  }

  return (
    <>
      <div>
        <BiPlayCircle onClick={handleTrailer} className={styles.playButton} />
        <span style={{ marginLeft: "5px" }}>Watch Trailer</span>
      </div>

      {modal
        ? data &&
          trailers.map((el) =>
            el.type === "Trailer" &&
            (el.name.includes("Official Trailer") ||
              el.name.includes("Trailer") ||
              el.name.includes("OFFICIAL TRAILER")) ? (
              <div key={el.key} className={styles.popupTrailer}>
                <RxCross2
                  onClick={handleTrailer}
                  className={styles.closeButton}
                />

                <iframe
                  className={styles.video}
                  src={`https://www.youtube.com/embed/${el.key}`}
                  title={el.name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                ></iframe>
              </div>
            ) : null
          )
        : null}
    </>
  );
}
