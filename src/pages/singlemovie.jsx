import React from 'react';
import { useData } from '../context/data-context';
import "./singlemovie.css";

import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

export const SingleMoviePage = () =>{
    const {movies,dispatch,starred,watchlist} = useData();
    const {movId} = useParams();
    const movie = movies.find((m)=>m.id==movId)

    const AddToStarred = (movie,event) =>{
        event.stopPropagation();
       dispatch({
        type:"AddtoStarred",
        payload: movie
       })
    }
    const AddToWatchlist = (movie,e) =>{
        e.stopPropagation();
        dispatch({
            type:"AddtoWatchlist",
            payload: movie
           })
        
    }
    const RemovefromStarred =(movie)=>{
        dispatch({
            type:"RemovefromStarred",
            payload: movie
           })
    }
    const RemovefromWatchlist =(movie)=>{
        dispatch({
            type:"RemovefromWatchlist",
            payload: movie
           })
    }

    return(
        <div className="main-container">
            <div className="main-section ">
                <div className="movie-card">
                    <div className="image-div">
                        <img src={`${movie.imageURL}`} />

                    </div>
                    <div className="details-div">
                        <h3 className="title">{movie.title}</h3>
                        <h4>{movie.summary}</h4>
                        <h4>year : {movie.year}</h4>
                        <h4>genre : {movie.genre}</h4>
                        <h4>rating : {movie.rating}</h4>
                        <h4>director : {movie.director}</h4>
                        <h4>writer : {movie.writer}</h4>
                        <h4>cast : {movie.cast}</h4>
                        <div className="card-buttons">
                        {starred?.find((m)=>m.id===movie.id)?<Button variant="primary" onClick={()=>{RemovefromStarred(movie)}}>Remove Starred </Button> : <Button variant="primary" onClick={(event)=>{AddToStarred(movie,event)}}>Star </Button>}
                            {watchlist?.find((m)=>m.id===movie.id)?<Button variant="primary" onClick={()=>{RemovefromWatchlist(movie)}}>Remove from WatchList </Button>  :<Button variant="primary" onClick={(e)=>{AddToWatchlist(movie,e)}}>Add To WatchList </Button> }


                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}