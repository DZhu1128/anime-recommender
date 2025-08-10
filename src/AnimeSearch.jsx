import React, { useState } from "react";

function AnimeSearch({ onAnimeSelect }) {
  const [query, setQuery] = useState("");
  const [animeResults, setAnimeResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();  // prevent page reload
    handleSearch();
  };
  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://graphql.anilist.co`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: `
              query ($search: String) {
                Page(perPage: 10) {
                  media(search: $search, type: ANIME) {
                    id
                    title {
                      romaji
                      english
                    }
                    description(asHtml: false)
                    coverImage {
                      large
                    }
                  }
                }
              }
            `,
            variables: { search: query }
          })
        }
      );

      const data = await response.json();

      if (data.errors) {
        setError("Error fetching anime.");
      } else {
        setAnimeResults(data.data.Page.media);
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Search for anime..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"  // make sure button triggers form submit
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {animeResults.map((anime) => (
  <React.Fragment key={anime.id}>
    <div
      onClick={() => {
        setSelectedId(anime.id);
        onAnimeSelect({
          title: anime.title.english || anime.title.romaji,
          image: anime.coverImage.large,
          description: anime.description,
        });
      }}
      className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
      style={{ cursor: "pointer" }}  // pointer cursor
    >
      <img
        src={anime.coverImage.large}
        alt={anime.title.english || anime.title.romaji}
        className="w-full rounded-lg"
        style={{ cursor: "pointer" }}  // pointer cursor on image as well
      />
      <h3 className="text-lg font-semibold mt-2" style={{ cursor: "pointer" }}>
        {anime.title.english || anime.title.romaji}
      </h3>
    </div>

    {selectedId === anime.id && (
      <div className="bg-gray-100 p-4 rounded-lg mt-2 shadow col-span-full">
        <h4 className="font-bold text-xl mb-2">
          {anime.title.english || anime.title.romaji}
        </h4>
        <p>{anime.description}</p>
      </div>
    )}
  </React.Fragment>
))}
      </div>
    </div>
  );
}

export default AnimeSearch;