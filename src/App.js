import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import { NavBar } from './components/navbar';
import { HomePage } from './pages/homepage';
import { WatchlistPage } from './pages/watchlist';
import { StarredPage } from './pages/starred';
import { SingleMoviePage } from './pages/singlemovie';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
           <Route path="/" element={<HomePage/>}  />
          <Route path="/watchlist" element={ <WatchlistPage/>}  />
          <Route path ="/starred" element={<StarredPage/>} />
         <Route path ="/:movId" element={<SingleMoviePage/> } />
        </Routes>

    </div>
  );
}

export default App;
