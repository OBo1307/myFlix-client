import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import myFlixLogo from '../../img/popcorn.png';

export const SignupView = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch('https://boflixapp.herokuapp.com/users', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((response) => {
			if (response.ok) {
				alert('Signup succesful');
				window.location.replace('/login');
			} else {
				alert('We have this user already');
			}
		});
	};

	return (
		<Form onSubmit={handleSubmit}>
			<div>
				<h2 className='d-flex justify-content-center mt-5'>Welcome to</h2>
				<span className='text-warning d-flex justify-content-center myflixtext'>
					MyFlix
				</span>
			</div>
			<Form.Group controlId='signUpFormUsername'>
				<Form.Label>Username:</Form.Label>
				<Form.Control
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='signUpFormPassword'>
				<Form.Label>Password:</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='signUpFormEmail'>
				<Form.Label>Email:</Form.Label>
				<Form.Control
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</Form.Group>
			<Form.Group controlId='signUpFormBirthday'>
				<Form.Label>Birthday:</Form.Label>
				<Form.Control
					type='date'
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
				/>
			</Form.Group>
			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
};
