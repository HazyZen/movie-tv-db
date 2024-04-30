import styles from "../Styles/MovieAbout.module.css";
import defaultImg from "../Images/defaultImg.jpg";
import React from "react";

export default function MovieAbout({ data, config }) {
  return (
    <div className={styles.container}>
      <div className={styles.castWrapper}>
        <h3 key="castheader">Top Cast</h3>
        <div className={styles.castContainer}>
          {data.credits &&
            data.credits.cast.slice(0, 10).map((ppl) => {
              return (
                <React.Fragment key={ppl.id}>
                  {ppl.profile_path === null ? (
                    <div className={styles.castCard}>
                      <img
                        src={`${defaultImg}`}
                        alt={ppl.name}
                        className={styles.defaultImg}
                      />
                      <p>{ppl.name}</p>
                    </div>
                  ) : (
                    <div className={styles.castCard}>
                      <img
                        key={ppl.id}
                        src={`${config.baseURL}${config.posterSize}${ppl.profile_path}`}
                        alt={ppl.name}
                        className={styles.castImg}
                      />
                      <p>{ppl.name}</p>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>

      <ul className={styles.stats}>
        <li key="status">
          <strong>Status</strong>
          <br />
          {data && data.status}
          <hr />
        </li>

        <li key="budget">
          <strong>Budget</strong>
          <br />
          {data && data.budget > 0
            ? "$" +
              data.budget.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })
            : "-"}
          <hr />
        </li>
        <li key="revenue">
          <strong>Revenue</strong>
          <br />
          {data && data.revenue > 0
            ? "$" +
              data.revenue.toLocaleString("en-US", {
                minimumFractionDigits: 0,
              })
            : "-"}
          <hr />
        </li>
      </ul>
    </div>
  );
}
