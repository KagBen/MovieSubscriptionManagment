import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";



const MoviePage = () => {
  const {id} = useParams() 
 const AllMovies = useSelector(state => state.movies.movies)
const movie = AllMovies.find(movie => movie._id === id )
console.log(movie)

  return (
    <>
    <div>MoviePage</div>
    <h3>Hello</h3>
    </>
  )
}

export default MoviePage
