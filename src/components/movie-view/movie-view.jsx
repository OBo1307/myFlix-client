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
		<div className='container'>
			<div className='row'>
				<div className='col-md-4'>
					<img
						className='w-100 mb-1 mt-4'
						src={movie.image}
						alt={altDescription}
					/>
					<div className='d-flex justify-content-between'>
						<Button
							className='w-50 me-2'
							variant={isFavorite ? 'danger' : 'success'}
							onClick={isFavorite ? removeFavorite : addFavorite}
						>
							{isFavorite ? 'Remove from favorites' : 'Add to favorites'}
						</Button>
						<Link to={`/`}>
							<Button className='ms-2 back-button' variant='secondary'>
								Back
							</Button>
						</Link>
					</div>
				</div>
				<div className='col-md-8 mt-4'>
					<h2 className='text-center mb-4'>{movie.title}</h2>
					<span className='font-weight-bold'>Description: </span>
					<p className='text-justify'>{movie.description}</p>
					<div>
						<span className='font-weight-bold'>Director: </span>
						<p>{movie.director}</p>
					</div>
					<div>
						<span className='font-weight-bold'>Genre: </span>
						<p>{movie.genre}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
