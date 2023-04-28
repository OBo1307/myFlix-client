import { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSearch(searchValue);
	};

	const handleChange = (e) => {
		const value = e.target.value;
		setSearchValue(value);
		onSearch(value);
	};

	return (
		<Form inline onSubmit={handleSubmit}>
			<FormControl
				type='text'
				placeholder='Search by title'
				className='mr-sm-2 shadow bg-primary text-warning font-monospace'
				value={searchValue}
				onChange={handleChange}
			/>
			<Button type='submit' variant='outline-light'>
				Search
			</Button>
		</Form>
	);
};

export default SearchBar;
