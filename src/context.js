import React, { useContext, useEffect, useState } from 'react'

const AppContext = React.createContext();

export const API_KEY = `https://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_API_KEY}`;

export const AppProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show: false, msg: ""});
    const [query, setQuery] = useState("");

    


    const getMovieData = async (url)=>{
        setIsLoading(true);
        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if(data.Response === "True"){
                setMovie(data.Search);
                setIsLoading(false);
                setIsError({
                    show : false,
                    msg : ""
                });
            }else{
                setMovie([]);
                setIsError({
                    show : true,
                    msg : data.Error
                });
            }

        }
        catch(Error){
            console.log(Error);
        }

    }

    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(query==="")
                getMovieData(API_KEY+'&s=Avengers');
            else
                getMovieData(API_KEY+'&s='+query);
        },800);

        return () => clearTimeout(timer);
    },[query])


  return (
    <AppContext.Provider value={{isLoading, movie, isError, query, setQuery}}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}
