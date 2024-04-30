import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useState } from "react";
import styles from "./Styles/SelectMovieTv.module.css";

export default function SelectMovieTv({
  movieClick,
  tvClick,
  dayClick,
  weekClick,
}) {
  const [movieOrTv, setMovieOrTv] = useState("");
  const [dayOrWeek, setDayOrWeek] = useState("");

  const handleMovieTvChange = (event) => {
    setMovieOrTv(event.target.value);
  };

  const handleDayWeekChange = (event) => {
    setDayOrWeek(event.target.value);
  };

  return (
    <div className={styles.formContainer}>
      <FormControl className={styles.type}>
        <InputLabel id="select-movie-tv">Movies / TV Shows</InputLabel>
        <Select
          labelId="select-movie-tv"
          value={movieOrTv}
          label="Movies / TV Shows"
          autoWidth
          onChange={handleMovieTvChange}
          style={{ backgroundColor: "white" }}
        >
          <MenuItem onClick={movieClick} value="Movies">
            Movies
          </MenuItem>
          <MenuItem onClick={tvClick} value="TV Shows">
            TV Shows
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl className={styles.dayWeek}>
        <InputLabel id="select-day-week">Day / Week</InputLabel>
        <Select
          labelId="select-day-week"
          value={dayOrWeek}
          label="Day / Week"
          onChange={handleDayWeekChange}
          style={{ backgroundColor: "white" }}
        >
          <MenuItem onClick={dayClick} value="Day">
            Day
          </MenuItem>
          <MenuItem onClick={weekClick} value="Week">
            Week
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
