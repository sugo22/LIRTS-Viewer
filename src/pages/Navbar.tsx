import { Link } from "react-router-dom";
import '../styles/Navigation.css';
 
function Navbar() {
    return (
      <nav>
        <ul className = "NavigationBar">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/App">Tool</Link>
          </li>
        </ul>
      </nav>
    );
  }


  export default Navbar;