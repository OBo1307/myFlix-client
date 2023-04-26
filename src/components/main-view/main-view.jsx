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

export const MainView = () => {
	const storedUser = JSON.parse(localStorage.getItem('user'));
	const storedToken = localStorage.getItem('token');
	const [movies, setMovies] = useState([]);
  const [viewMovies, setViewMovies] = useState(movies);
	const [user, setUser] = useState(storedUser ? storedUser : null);
	const [token, setToken] = useState(storedToken ? storedToken : null);

  const updateUser = user => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

	useEffect(() => {
		if (!token) {
			return;
		}

		fetch('https://boflixapp.herokuapp.com/movies', {
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => response.json())
			.then(movies => {
				const moviesFromApi = movies.map(movie => {
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
                  <ProfileView user={user} token={token} movies={movies} onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                  }} updateUser={updateUser} />
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
										<MovieView movies={movies} user={user} token={token} updateUser={updateUser} />
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
								) : movies.length === 0 ? (
									<Col>The list is empty!</Col>
								) : (
									<>
										{movies.map((movie) => (
											<Col className='mb-5' key={movie.id} md={4}>
												<MovieCard movie={movie} />
											</Col>
										))}
									</>
								)}
							</>
						}
					/>
				</Routes>
			</Row>
		</BrowserRouter>
	);
};
