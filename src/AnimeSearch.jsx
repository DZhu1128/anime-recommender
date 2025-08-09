import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

// 1. GraphQL query to search anime
const SEARCH_ANIME = gql`
  query ($search: String) {
    Page(perPage: 5) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          medium
        }
      }
    }
  }
`

export default function AnimeSearch() {
  const [searchTerm, setSearchTerm] = useState('') // store input
  const [searchAnime, { loading, error, data }] = useLazyQuery(SEARCH_ANIME)

  // 2. Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    searchAnime({ variables: { search: searchTerm } })
  }

  return (
    <div>
      <h1>Anime Search</h1>
      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter anime title"
        />
        <button type="submit">Search</button>
      </form>

      {/* Loading State */}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {/* Show results */}
      {data && (
        <ul>
          {data.Page.media.map((anime) => (
            <li key={anime.id}>
              <img src={anime.coverImage.medium} alt={anime.title.romaji} />
              <p>{anime.title.english || anime.title.romaji}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}