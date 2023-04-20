import { useEffect, useState } from 'react';

// Import statement to indicate that you need to bundle `../movie-card/movie-card.jsx`
import { MovieCard } from '../movie-card/movie-card';

// Import statement to indicate that you need to bundle `../movie-view/movie-view.jsx`
import { MovieView } from '../movie-view/movie-view';

// Import statement to indicate that you need to bundle `../movie-view/movie-view.jsx`
import { LoginView } from '../login-view/login-view';

// Import statement to indicate that you need to bundle `../movie-view/movie-view.jsx`
import { SignupView } from '../signup-view/signup-view';

// Import statement to indicate that you need to bundle `react-bootstrap/Row`
import Row from 'react-bootstrap/Row';

// Import statement to indicate that you need to bundle `react-bootstrap/Col`
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch('https://boflixapp.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((data) => {
				const moviesFromApi = data.map((doc) => {
					return {
						id: doc._id,
						title: doc.Title,
						description: doc.Description,
						genre: doc.Genre.Name,
						director: doc.Director.Name,
						image: doc.ImageURL,
					};
				});
				setMovies(moviesFromApi);
			});
	}, [token]);

	return (
		<Row className='justify-content-md-center'>
			{!user ? (
				<Col md={5}>
					<LoginView
						onLoggedIn={(user, token) => {
							setUser(user);
							setToken(token);
						}}
					/>
					or
					<SignupView />
				</Col>
			) : selectedMovie ? (
				<Col md={8}>
					<MovieView
						movie={selectedMovie}
						onBackClick={() => setSelectedMovie(null)}
					/>
				</Col>
			) : movies.length === 0 ? (
				<div>The list is empty!</div>
			) : (
				<>
          <Row>
            <Col className='text-end mt-5'>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
                >
                  Sign out
                </Button>
            </Col>
          </Row>
					{movies.map((movie) => (
						<Col className='mb-4' key={movie.id} md={3}>
							<MovieCard
								movie={movie}
								onMovieClick={(newSelectedMovie) => {
									setSelectedMovie(newSelectedMovie);
								}}
							/>
						</Col>
					))}
				</>
			)}
		</Row>
	);
};