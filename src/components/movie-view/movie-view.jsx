import Button from "react-bootstrap/Button";

export const MovieView = ({ movie, onBackClick }) => {
  let altDescription = `Poster for ${movie.title}`
  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} alt={altDescription} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <Button variant="primary" onClick={onBackClick}>Back</Button>
    </div>
  );
};