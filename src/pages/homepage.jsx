import React from 'react';
import { useData } from '../context/data-context';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import "./homepage.css";

export const HomePage = () =>{
    const {movies,dispatch,starred,watchlist} = useData();
    const navigate = useNavigate();
    const AddToStarred = (mov,event) =>{
        event.stopPropagation();
       dispatch({
        type:"AddtoStarred",
        payload: mov
       })
    }
    const AddToWatchlist = (mov,e) =>{
        e.stopPropagation();
        dispatch({
            type:"AddtoWatchlist",
            payload: mov
           })
    }

    return(
        <div className="main-container">
            <div className="top-section ">

            </div>
            <div className="movie-listing">
                {movies.map((mov)=>{
                    return(
                        <Card className="card" style={{ width: '18rem', cursor:'pointer' }} onClick={()=>{navigate(`/${mov.id}`)}} key={mov.id}>
                        <Card.Img variant="top" src={`${mov.imageURL}`} />
                        <Card.Body>
                          <Card.Title >{mov.title}</Card.Title>
                          <Card.Text>
                            {mov.summary}
                          </Card.Text>
                          <div className="card-buttons">
                            {starred?.find((m)=>m.id===mov.id)?<Button variant="primary" >Starred </Button> : <Button variant="primary" onClick={(event)=>{AddToStarred(mov,event)}}>Star </Button>}
                            {watchlist?.find((m)=>m.id===mov.id)?<Button variant="primary" >Added To WatchList </Button>  :<Button variant="primary" onClick={(e)=>{AddToWatchlist(mov,e)}}>Add To WatchList </Button> }
                          
                          </div>
                          
                        </Card.Body>
                      </Card>
                    )
                })}

            </div>
        </div>
    )
}