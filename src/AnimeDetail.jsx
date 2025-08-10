import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AnimeDetail() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query ($id: Int) {
            Media(id: $id) {
              id
              title {
                romaji
                english
              }
              description(asHtml: false)
              coverImage {
                large
              }
              averageScore
              episodes
            }
          }
        `,
        variables: { id: parseInt(id) },
      }),
    })
      .then((res) => res.json())
      .then((data) => setAnime(data.data.Media))
      .catch((err) => console.error(err));
  }, [id]);

  if (!anime) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={anime.coverImage.large}
        alt={anime.title.romaji}
        className="rounded-lg shadow-lg w-full max-w-sm mx-auto"
      />
      <h1 className="text-2xl font-bold mt-4">{anime.title.english || anime.title.romaji}</h1>
      <p className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: anime.description }}></p>
      <div className="mt-4">
        <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
        <p><strong>Average Score:</strong> {anime.averageScore || "N/A"}</p>
      </div>
    </div>
  );
}