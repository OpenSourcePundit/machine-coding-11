import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
function App() {
  return (
    <div className="App">
      <div>
      <h1>
        Example heading <Badge bg="secondary">New</Badge>
      </h1>
      <h2>
        Example heading <Badge bg="secondary">New</Badge>
      </h2>
      <h3>
        Example heading <Badge bg="secondary">New</Badge>
      </h3>
      <h4>
        Example heading <Badge bg="secondary">New</Badge>
      </h4>
      <h5>
        Example heading <Badge bg="secondary">New</Badge>
      </h5>
      <h6>
        Example heading <Badge bg="secondary">New</Badge>
      </h6>
    </div>
      <Routes>
          {/* <Route path="/" element={<HomePage/>}  />
          <Route path="/department" element={ <DepartmentPage/>}  />
          <Route path ="/products" element={<ProductsPage/>} />
          {/* <Route path ="/:category/:vidid" element={<VideoPage/>} /> */}
          {/* <Route path ="/products/:prodId" element={<SingleProductPage/>} /> */} */
         


        </Routes>

    </div>
  );
}

export default App;
