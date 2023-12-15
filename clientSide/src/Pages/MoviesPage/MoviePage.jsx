import { useSelector } from "react-redux";


const MoviePage = () => {

  const AllMovies = useSelector(state => state.movies.movies)
  console.log(AllMovies)
//const movie = AllMovies.find(movie => movie._id ===  )

  return (
    <div>MoviePage</div>
  )
}

export default MoviePage
