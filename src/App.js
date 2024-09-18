import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Name from './components/name';
import Home from './pages/home';


function App() {
  return (
    <Router> {/* Wrap everything inside Router */}
      <div className="App">
        <Name /> {/* Render your Name component */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
