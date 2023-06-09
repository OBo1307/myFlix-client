import { useState } from 'react';
import { Card, Col, Form, Button, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({
	user,
	token,
	movies,
	onLoggedOut,
	updateUser,
}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState('');

	const favoriteMovies = user.FavoriteMovies
		? movies.filter((m) => user.FavoriteMovies.includes(m.id))
		: [];

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
		};

		fetch(`https://boflixapp.herokuapp.com/users/${user.Username}`, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
		})
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					alert('Changing userdata failed');
					return false;
				}
			})
			.then((user) => {
				if (user) {
					alert('Successfully changed userdata');
					updateUser(user);
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	const deleteAccount = () => {
		fetch(`https://boflixapp.herokuapp.com/users/${user.Username}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		})
			.then((response) => {
				if (response.ok) {
					alert('Your account has been deleted. Good Bye!');
					onLoggedOut();
				} else {
					alert('Could not delete account');
				}
			})
			.catch((e) => {
				alert(e);
			});
	};

	return (
		<>
			<Container className='justify-content-center d-flex w-50 h-50'>
				<Col md={6}>
					<Card className='mt-3 mb-3'>
						<Card.Body>
							<Card.Title>Your info</Card.Title>
							<p>Username: {user.Username}</p>
							<p>Email: {user.Email}</p>
							<p>Birthdate: {user.Birthday}</p>
							<Button
								variant='danger'
								onClick={() => {
									if (confirm('Are you sure?')) {
										deleteAccount();
									}
								}}
							>
								Delete user account
							</Button>
						</Card.Body>
					</Card>
				</Col>
			</Container>
			<Container className='justify-content-center d-flex w-50 h-50'>
				<Col md={6}>
					<Card className='mt-3 mb-3'>
						<Card.Body>
							<Card.Title>Update your info</Card.Title>
							<Form onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label>Username:</Form.Label>
									<Form.Control
										type='text'
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										required
										minLength='5'
										className='bg-light'
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Password:</Form.Label>
									<Form.Control
										type='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										minLength='4'
										className='bg-light'
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Email:</Form.Label>
									<Form.Control
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										className='bg-light'
									/>
								</Form.Group>
								<Form.Group>
									<Form.Label>Birthdate:</Form.Label>
									<Form.Control
										type='date'
										value={birthdate}
										onChange={(e) => setBirthdate(e.target.value)}
										required
										className='bg-light'
									/>
								</Form.Group>
								<Button className='mt-3' variant='primary' type='submit'>
									Submit
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Container>
			<h2 className='fav-movie'>Favorite Movies:</h2>
			{favoriteMovies.map((movie) => (
				<Col xs={12} sm={6} md={4} lg={3} key={movie._id}>
					<MovieCard movie={movie} />
				</Col>
			))}
		</>
	);
};
