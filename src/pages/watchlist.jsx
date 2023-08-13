import React from 'react';
import { useData } from '../context/data-context';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./watchlist.css";

export const WatchlistPage = () =>{
    const {movies,dispatch,starred,watchlist} = useData();
    const AddToStarred = (mov) =>{
       dispatch({
        type:"AddtoStarred",
        payload: mov
       })
    }
    const AddToWatchlist = (mov) =>{
        dispatch({
            type:"AddtoWatchlist",
            payload: mov
           })
        
    }
    const RemovefromWatchlist =(mov)=>{
        dispatch({
            type:"RemovefromWatchlist",
            payload: mov
           })
    }

    return(
        <div className="main-container">
            <div className="top-section ">
            <h2 className="heading">WatchList</h2>

            </div>
            <div className="movie-listing">
                {watchlist?.map((mov)=>{
                    return(
                        <Card className="card" style={{ width: '18rem', cursor:'pointer' }} key={mov.id}>
                        <Card.Img variant="top" src={`${mov.imageURL}`} />
                        <Card.Body>
                          <Card.Title>{mov.title}</Card.Title>
                          <Card.Text>
                            {mov.summary}
                          </Card.Text>
                          <div className="card-buttons">                            
                            {watchlist?.find((m)=>m.id===mov.id)?<Button variant="primary" onClick={()=>{RemovefromWatchlist(mov)}} >Remove from WatchList </Button>  :<Button variant="primary" onClick={()=>{AddToWatchlist(mov)}}>Add To WatchList </Button> }
                          
                          </div>
                          
                        </Card.Body>
                      </Card>
                    )
                })}

            </div>
        </div>
    )
}