import { useState, createContext, useEffect } from "react";
import Popular from "./Popular";

export const ConfigContext = createContext();

const token = `${process.env.REACT_APP_TOKEN}`;

const Config = () => {
  const [config, setConfig] = useState();

  useEffect(() => {
    configFunc();
  }, []);

  const configFunc = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/configuration",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const configResult = await response.json();

      const configObj = {
        poster: configResult.images.still_sizes[2],
        url: configResult.images.secure_base_url,
        backdrop: configResult.images.backdrop_sizes[3],
        profile: {
          w45: configResult.images.profile_sizes[0],
          w185: configResult.images.profile_sizes[1],
          h632: configResult.images.profile_sizes[2],
          original: configResult.images.profile_sizes[3],
        },
      };
      setConfig(configObj);
      // console.log(configObj);
    } catch (error) {
      console.log("Error fetching config data: ", error);
    }
  };
  return (
    <ConfigContext.Provider value={config}>
      <Popular />
    </ConfigContext.Provider>
  );
};

export default Config;
