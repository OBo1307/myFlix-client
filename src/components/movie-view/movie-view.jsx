import { PropTypes } from 'prop-types';
import { useParams } from 'react-router';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const MovieView = ({ movies, user, token, updateUser }) => {
	const { movieId } = useParams();

	const movie = movies.find((m) => m.id === movieId);

	const [isFavorite, setIsFavorite] = useState(
		user.favoriteMovies && user.FavoriteMovies.includes(m.id)
	);

	useEffect(() => {
		setIsFavorite(user.favoriteMovies && user.FavoriteMovies.includes(m.id));
	}, [movieId]);

	const addFavorite = () => {
		fetch(
			`https://boflixapp.herokuapp.com/users/${user.Username}/movies/${movieId}`,
			{
				method: 'POST',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					alert('Failed');
					return false;
				}
			})
			.then((user) => {
				if (user) {
					alert('Successfully added to favorites');
					setIsFavorite(true);
					updateUser(user);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	const removeFavorite = () => {
		fetch(
			`https://boflixapp.herokuapp.com/users/${user.Username}/movies/${movieId}`,
			{
				method: 'DELETE',
				headers: { Authorization: `Bearer ${token}` },
			}
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					alert('Failed');
					return false;
				}
			})
			.then((user) => {
				if (user) {
					alert('Successfully deleted from favorites');
					setIsFavorite(false);
					updateUser(user);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	let altDescription = `Poster for ${movie.title}`;

	return (
		<div>
			<div>
				<img className='w-100' src={movie.image} alt={altDescription} />
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
			<Link to={`/`}>
				<button className='back-button'>Back</button>
			</Link>
			{isFavorite ? (
				<Button variant='danger' className='ms-2' onClick={removeFavorite}>
					Remove from favorites
				</Button>
			) : (
				<Button variant='success' className='ms-2' onClick={addFavorite}>
					Add to favorites
				</Button>
			)}
		</div>
	);
};
