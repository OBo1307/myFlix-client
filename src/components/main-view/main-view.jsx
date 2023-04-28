import { useEffect, useState } from 'react';

// Import statement to indicate that you need to bundle `../movie-card/movie-card.jsx`
import { MovieCard } from '../movie-card/movie-card';

// Import statement to indicate that you need to bundle `../movie-view/movie-view.jsx`
import { MovieView } from '../movie-view/movie-view';

// Import statement to indicate that you need to bundle `../movie-view/movie-view.jsx`
import { LoginView } from '../login-view/login-view';

// Import statement to indicate that you need to bundle `../movie-view/movie-view.jsx`
import { SignupView } from '../signup-view/signup-view';

import { ProfileView } from '../profile-view/profile-view';

// Import statement to indicate that you need to bundle
import { NavigationBar } from '../navigation-bar/navigation-bar';

// Import statement to indicate that you need to bundle
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import SearchBar from '../search-bar/search-bar';

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [movies, setMovies] = useState([]);
	const [viewMovies, setViewMovies] = useState(movies);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);
	const [searchTerm, setSearchTerm] = useState('');

	const updateUser = (user) => {
		setUser(user);
		localStorage.setItem('user', JSON.stringify(user));
	};

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch('https://boflixapp.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then((movies) => {
				const moviesFromApi = movies.map((movie) => {
					return {
						id: movie._id,
						title: movie.Title,
						description: movie.Description,
						genre: movie.Genre.Name,
						director: movie.Director.Name,
						image: movie.ImageURL,
					};
				});
				setMovies(moviesFromApi);
			});
	}, [token]);

	useEffect(() => {
		setViewMovies(movies);
	}, [movies]);

	useEffect(() => {
		const filteredMovies = movies.filter((movie) =>
			movie.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setViewMovies(filteredMovies);
	}, [movies, searchTerm]);

	return (
		<BrowserRouter>
			<NavigationBar
				user={user}
				onLoggedOut={() => {
					setUser(null);
					setToken(null);
					localStorage.clear();
				}}
			/>

			<Row className='justify-content-md-center'>
				<Routes>
					<Route
						path='/signup'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<SignupView />
									</Col>
								)}
							</>
						}
					/>

					<Route
						path='/login'
						element={
							<>
								{user ? (
									<Navigate to='/' />
								) : (
									<Col md={5}>
										<LoginView
											onLoggedIn={(user, token) => {
												setUser(user);
												setToken(token);
											}}
										/>
									</Col>
								)}
							</>
						}
					/>
					<Route
						path='/profile'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<ProfileView
										user={user}
										token={token}
										movies={movies}
										onLoggedOut={() => {
											setUser(null);
											setToken(null);
											localStorage.clear();
										}}
										updateUser={updateUser}
									/>
								)}
							</>
						}
					/>
					<Route
						path='/movies/:movieId'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<Col md={8}>
										<MovieView
											movies={viewMovies}
											user={user}
											token={token}
											updateUser={updateUser}
											onUpdateMovies={(movies) => setMovies(movies)}
										/>
									</Col>
								)}
							</>
						}
					/>

					<Route
						path='/'
						element={
							<>
								{!user ? (
									<Navigate to='/login' replace />
								) : (
									<>
										<Row className='search-bar w-50'>
											<SearchBar onSearch={setSearchTerm} />
										</Row>
										<Row>
											{viewMovies.map((movie) => (
												<Col key={movie.id} xs={12} sm={6} md={4}>
													<MovieCard movie={movie} />
												</Col>
											))}
										</Row>
									</>
								)}
							</>
						}
					/>
					<Route path='*' element={<div>Not Found</div>} />
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
