import React from 'react';

// Import PropTypes library
import PropTypes from 'prop-types';

import { Button, Card, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// MovieCard function component
export const MovieCard = ({ movie }) => {
	return (
		<Container
			className='justify-content-center d-flex'
			xs={12}
			sm={6}
			md={4}
			lg={3}
		>
			<Card className='h-75 w-75 bg-dark text-white'>
				<Card.Img variant='top' src={movie.image} />
				<Card.Body className='d-flex flex-column'>
					<Card.Title className='mt-2'>{movie.title}</Card.Title>
					<Card.Text className='mt-3'>Director: {movie.director}</Card.Text>
					<div className='mt-auto d-flex justify-content-end'>
						<Link to={`/movies/${encodeURIComponent(movie.id)}`}>
							<Button variant='primary' className='mt-auto'>
								Details
							</Button>
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Container>
	);
};

// Define all the props constraints for the MovieCard
MovieCard.propTypes = {
	movie: PropTypes.shape({
		title: PropTypes.string.isRequired,
		image: PropTypes.string.isRequired,
		director: PropTypes.string.isRequired,
	}).isRequired,
};
