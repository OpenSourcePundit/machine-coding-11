export const Reducer = (state,{type,payload}) =>{

    switch(type){
            case "Sort":
            //return  {...state, category:{...state.category,  payload}};
            console.log("red",payload)
            return  {
                ...state,sortBy:payload
            };      
            case "addProduct":
            return{
                ...state, Data:[...state.Data,payload]
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
            
            default: 
            return state;
 }

}