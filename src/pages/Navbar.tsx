import { Link } from "react-router-dom";
import './Navigation.css';
 
function Navbar() {
  return (
    <nav>
      <ul className = "NavigationBar">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/Gene">Expression Analysis</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;