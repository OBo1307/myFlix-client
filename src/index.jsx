import { createRoot } from 'react-dom/client';

// Import statement to indicate that yo need to bundle `./components/main-view/main-view.jsx`
import { MainView } from './components/main-view/main-view';

// Import statement to indicate that you need to bundle "react-bootstrap/Container"
import { Container } from 'react-bootstrap';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
	return <MainView />;
};

// Finds the root of your app
const container = document.querySelector('#root');
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<MyFlixApplication />);
