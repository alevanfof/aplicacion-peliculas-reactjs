import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [movieList, setMovieList] = useState([null])

    const urlBase = 'http://www.omdbapi.com/?i=tt3896198&apikey='
    const API_KEY = 'YOUR_API_KEY'

    const handleInputChange = ({target}) => {
        setSearch(target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        fetchMovies()
        console.log(movieList)
    }

    const fetchMovies = async () => {

        try {
            const response = await fetch(`${urlBase}${API_KEY}&s=${search}&lang=es-ES`)
            const data = await response.json()
            setMovieList(data.Search)
            
        } catch (error) {
            console.error('Ha ocurrido el siguiente error: ', error)
        }
    }


    return (
        <div className='container'>
        <h1>Buscador de Películas</h1>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Busca tu película favorita"
                value={search}
                onChange={handleInputChange}
            />
            <button>Buscar</button>
        </form>
        {movieList?.length > 0 && (
            <div className='movie-list'>
                {movieList
                .filter(movie => movie !== null && movie.Poster && movie.Poster !== "N/A") // Filtrar elementos nulos o con Poster "N/A"
                .map(movie => (
                    <div className='movie-card' key={movie.imdbID}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
};
