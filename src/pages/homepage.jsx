import {React,useState }from "react";
import { v4 as uuid } from 'uuid';

import { useData } from "../context/data-context";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

import Modal from 'react-bootstrap/Modal';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const HomePage = () => {

    const handleClose = () => {setShowModal(false)};
    const handleShow = () => setShowModal(true);

    const [showModal, setShowModal] = useState(false);
    const [Fgenre,setFgenre] = useState('none');
    const [Ftitle,setFtitle] = useState('');
    const [Fyear,setFyear] = useState('');
    const [Frating,setFrating] = useState('');
    const [Fdirector,setFdirector] = useState('');
    const [Fcast,setFcast] = useState('');
    const [Fwriter,setFwriter] = useState('');
    const [Fsummary,setFsummary] = useState('');
    const [FimageURL,setFimageURL] = useState('')
    const addMovie = () => {

        dispatch({type:"addMovie",payload:{
          id: uuid(),
          genre:Fgenre,
          title: Ftitle,
          year:
          Fyear,
          rating:Number(Frating),
          director:Fdirector,
          cast:Fcast,
          writer: Fwriter,
          summary: Fsummary,
          imageUrl: FimageURL,
        }})
        setShowModal(false)
      }



  const { movies, dispatch, starred, watchlist, genre, star, year,search } = useData();
  const genrearr = [
    "all genre",
    "Drama",
    "Crime",
    "Action",
    "Adventure",
    "Fantasy",
    "Romance",
    "Sci-Fi",
    "Biography",
  ];
  const stararr = [8,9,'all rating'];
  const yeararr = [1991,1992,1994,1999,2001,2003,2008,2010,'all time']
  const navigate = useNavigate();
  const AddToStarred = (mov, event) => {
    event.stopPropagation();
    dispatch({
      type: "AddtoStarred",
      payload: mov,
    });
  };
  const AddToWatchlist = (mov, e) => {
    e.stopPropagation();
    dispatch({
      type: "AddtoWatchlist",
      payload: mov,
    });
  };
  let searchData = movies.filter((mov)=>{
    return(mov.title.toLowerCase().includes(search.toLowerCase()) || mov.director.toLowerCase().includes(search.toLowerCase()) 
    // || mov.cast?.map((cas)=>cas)?.toLowerCase().includes(search.toLowerCase()) 
    )
    })
  let genfilter = (search!==""?searchData:movies).filter((mov)=>{
    return genre != "all genre"
      ? mov.genre.find((gen)=>gen===genre)
      : 1 == 1;
  })
  let starfilter = genfilter.filter((mov)=>{
    return star != "all rating"
    ? mov.rating == star
    : 1 == 1;
  })
  let yearfilter = starfilter.filter((mov)=>{
    return year != "all time"
    ? mov.year == year
    : 1 == 1;
  })

  return (
    <div className="main-container">
      <div className="top-section ">
        <h2 className="movies">Movies</h2>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {genre}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {genrearr.map((gen) => (
              <Dropdown.Item key={gen} onClick={()=>dispatch({type:"genre",payload:gen})}>{gen}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {star}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {stararr.map((star)=><Dropdown.Item key={star} onClick={()=>dispatch({type:"star",payload:star})} >{star}</Dropdown.Item>)}
           
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown className="d-inline mx-2">
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {year}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {yeararr.map((year)=><Dropdown.Item key={year} onClick={()=>dispatch({type:"year",payload:year})} >{year}</Dropdown.Item>)}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={handleShow}>Add New Movie</Button>
      </div>
      <div className="movie-listing">
        {yearfilter.map((mov) => {
          return (
            <Card
              className="card"
              style={{ width: "18rem", cursor: "pointer" }}
              onClick={() => {
                navigate(`/${mov.id}`);
              }}
              key={mov.id}
            >
              <Card.Img variant="top" src={`${mov.imageURL}`} />
              <Card.Body>
                <Card.Title>{mov.title}</Card.Title>
                <Card.Text>{mov.director}</Card.Text>
                <Card.Text>{mov.summary}</Card.Text>
                <div className="card-buttons">
                  {starred?.find((m) => m.id === mov.id) ? (
                    <Button variant="primary">Starred </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={(event) => {
                        AddToStarred(mov, event);
                      }}
                    >
                      Star{" "}
                    </Button>
                  )}
                  {watchlist?.find((m) => m.id === mov.id) ? (
                    <Button variant="primary">Added To WatchList </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        AddToWatchlist(mov, e);
                      }}
                    >
                      Add To WatchList{" "}
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
       {/* Add New Product Modal Modal  */}
       <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Form >
        <Modal.Body>        
        <InputGroup className="mb-3">
        <DropdownButton
          variant="outline-secondary"
          title="Dropdown"
          id="input-group-dropdown-1"
        >
          {genrearr.map((gen)=><Dropdown.Item key={gen} onClick={()=>setFgenre(gen)} >{gen}</Dropdown.Item>)}
        </DropdownButton>
        <Form.Control aria-label="dropdown button" type = 'text' disabled placeholder={`${Fgenre}`}  />
        
      </InputGroup>
      {/* <Form.Control  type = 'text' placeholder={`${department}`}  /> */}

      <Form.Label htmlFor="title">title</Form.Label>
      <Form.Control 
        value={Ftitle}
        onChange={(e)=>setFtitle(e.target.value)}
        type="text"
        id="title"
      />
      <Form.Label htmlFor="year">year</Form.Label>
      <Form.Control
        value={Fyear}
        onChange={(e)=>setFyear(e.target.value)}
        type="number"
        id="year"
      />
      <Form.Label htmlFor="rating">rating</Form.Label>
      <Form.Control
        value={Frating}
        onChange={(e)=>setFrating(e.target.value)}
        type="number"
        id="rating"
        aria-describedby="passwordHelpBlock"
      />
      <Form.Label htmlFor="Stock">director</Form.Label>
      <Form.Control
        value={Fdirector}
        onChange={(e)=>setFdirector(e.target.value)}
        type="text"
        id="director"
      />
      <Form.Label htmlFor="cast">cast</Form.Label>
      <Form.Control
        value={Fcast}
        onChange={(e)=>{setFcast(e.target.value)}}
        type="text"
        id="cast"
      />
      <Form.Label htmlFor="writer">writer</Form.Label>
      <Form.Control
        value={Fwriter}
        onChange={(e)=>setFwriter(e.target.value)}
        type="text"
        id="writer"
      />
      <Form.Label htmlFor="summary">summary</Form.Label>
      <Form.Control
        value={Fsummary}
        onChange={(e)=>setFsummary(e.target.value)}
        type="text"
        id="summary"
      />
      <Form.Label htmlFor="ImageURL">ImageURL</Form.Label>
      <Form.Control
        value={FimageURL}
        onChange={(e)=>setFimageURL(e.target.value)}
        type="text"
        id="ImageURL"
      />


            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addMovie} >
            Add Movie
          </Button>
          
        </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};
