import './pages/App.css';
import Navbar from './pages/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import App from './pages/App';
import Gene from './pages/Gene'
/*import Heat from './pages/Heat'*/
import './styles/Display.css'
import logo from './UDlw.svg';

function Display() {
return (
    <Router>
    <Navbar />
    <br></br>
    <br></br>
    <Routes>
        <Route path='/Home' element={<Home/>}/>      
        <Route path='/App' element={<App/>} />
        <Route path='/Gene' element={<Gene/>} />
        {/*<Route path='/Heat' element={<Heat/>} />*/}
        <Route path="*" element={<Navigate to="/Home" replace />} />
    </Routes>
    <footer className = "footer">
    <div className = "UDlogo">
    <img src={logo} alt=" University of Delaware" width="160px" />
    </div>
    </footer>
    </Router>
);
}
  
export default Display;