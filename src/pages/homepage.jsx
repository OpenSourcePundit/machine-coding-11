import React from "react";
import { useData } from "../context/data-context";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./homepage.css";

export const HomePage = () => {
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
        <Button variant="primary">Add New Movie</Button>
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
    </div>
  );
};
