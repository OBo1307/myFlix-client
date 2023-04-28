import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

import myFlixLogo from '../../img/popcorn.png';
import myUserLogo from '../../img/user64.png';

export const NavigationBar = ({ user, onLoggedOut }) => {
	return (
		<Navbar bg='primary' variant='dark' expand='lg'>
			<Container>
				<Navbar.Brand
					expand='lg'
					className='navbar text-warning'
					as={Link}
					to='/'
				>
					<Image
						src={myFlixLogo}
						rel='Icon'
						width='30'
						height='30'
						className='d-inline-block align-top'
					/>
					MyFlix
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
					<Nav className='me-auto'>
						{!user && (
							<>
								<Nav.Link as={Link} to='/login'>
									Login
								</Nav.Link>
								<Nav.Link as={Link} to='/signup'>
									Signup
								</Nav.Link>
							</>
						)}
						{user && (
							<>
								<Nav.Link as={Link} className='text-white' to='/'>
									Home
								</Nav.Link>
								<Nav.Link as={Link} className='navbar' to={'/profile'}>
									<span className='text-warning'>{user.Username}</span>
								</Nav.Link>
								<Nav.Link onClick={onLoggedOut} className='text-white'>
									Logout
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};
