export const Reducer = (state,{type,payload}) =>{

    switch(type){
                 
            case "addMovie":
            return{
                ...state, movies:[...state.movies,payload]
            };
            case "AddtoStarred":
            return{
                ...state, starred:[...state.starred,payload]
            };
            case "AddtoWatchlist":
            return{
                ...state, watchlist:[...state.watchlist,payload]
            };
            case "RemovefromStarred":
                let newlist1 = state.starred.filter((m)=>m.id!==payload.id);
            return{
                ...state, starred:[...newlist1]
            };
            case "RemovefromWatchlist":
                let newlist = state.watchlist.filter((m)=>m.id!==payload.id);
            return{
                ...state, watchlist:[...newlist]
            };
            case "genre":
            return  {
                ...state,genre:payload
            }; 
            case "star":
            //return  {...state, category:{...state.category,  payload}};
            console.log("redstar",payload)
            return  {
                ...state,star:payload
            }; 
            case "year":
            //return  {...state, category:{...state.category,  payload}};
            console.log("redyear",payload)
            return  {
                ...state,year:payload
            }; 
            case "HandleSearch":
        return{
            ...state,search:payload
        }
            
            default: 
            return state;
 }

}