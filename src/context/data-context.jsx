import {useContext,createContext,useReducer,useState} from "react";
import { Reducer } from "../reducer";

const DataContext = createContext();


export const DataProvider = ({children}) =>{
    const [department,setDepartment] = useState('All Departments')
    const initialState = { 
    }

    const [state,dispatch] = useReducer(Reducer,initialState)






    return(
        <DataContext.Provider
          value = {{
            // Data:state.Data,
            // Departments:state.Departments,            
            // dispatch:dispatch,
            // department,setDepartment,
            // sortBy:state.sortBy
          }}
        >
            {children}
        </DataContext.Provider>
    )
}
export const useData = () => useContext(DataContext);