import React, { useState } from "react";
import AnimeSearch from "./AnimeSearch";

function App() {
  const [selectedAnime, setSelectedAnime] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Anime Search App</h1>

      <AnimeSearch onAnimeSelect={setSelectedAnime} />

      {selectedAnime && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-2xl font-semibold">{selectedAnime.title}</h2>
          <img
            src={selectedAnime.image}
            alt={selectedAnime.title}
            className="w-48 rounded-lg mt-2"
          />
          <p className="mt-2">{selectedAnime.description}</p>
        </div>
      )}
    </div>
  );
}

export default App;