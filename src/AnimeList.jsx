import { Link } from "react-router-dom";

export default function AnimeList({ anime }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {anime.map((item) => (
        <Link
          key={item.id}
          to={`/anime/${item.id}`} // 👈 Navigate to detail page
          className="block"
        >
          <div className="bg-white rounded-lg shadow hover:shadow-lg transition">
            <img
              src={item.coverImage.large}
              alt={item.title.romaji}
              className="rounded-t-lg w-full h-48 object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold">{item.title.romaji}</h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}