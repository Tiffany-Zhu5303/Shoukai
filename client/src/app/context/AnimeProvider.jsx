"use client";

import React, { createContext, useState } from "react";

export const AnimeContext = createContext(undefined);

export const AnimeProvider = ({ children }) => {
  const [anime, setAnime] = useState([]);

  return (
    <AnimeContext.Provider value={{ anime, setAnime }}>
      {children}
    </AnimeContext.Provider>
  );
};