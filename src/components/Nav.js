import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import About from '../pages/About';
import Snippets from './Snippets';

export default function Nav() {
  return (
    <Router>
      <ul>
        <li>
          <Link to="/">Snippets</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
      <Routes>
        <Route exact path='/' element={< Snippets />}></Route>
        <Route exact path='/about' element={< About />}></Route>
      </Routes>
    </Router>
  );
}
