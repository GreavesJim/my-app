import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import { initialState, reducer } from "../store/reducer";
import axios from "axios";

const MOVIE_API_URL = "https://www.omdbapi.com/?apikey=b0e6dd68";

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get(MOVIE_API_URL + "&s=spider").then((jsonResponse) => {
      dispatch({
        type: "SEARCH_MOVIES_SUCCESS",
        payload: jsonResponse.data.Search,
      });
    });
  }, []);

  // you can add this to the onClick listener of the Header component
  const refreshPage = () => {
    window.location.reload();
  };

  const search = (searchValue) => {
    dispatch({
      type: "SEARCH_MOVIES_REQUEST",
    });

    axios(`${MOVIE_API_URL}&s=${searchValue}`).then((jsonResponse) => {
      if (jsonResponse.data.Response === "True") {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.data.Search,
        });
      } else {
        dispatch({
          type: "SEARCH_MOVIES_FAILURE",
          error: jsonResponse.data.Error,
        });
      }
    });
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img
        className="spinner"
        src="https://thumbs.gfycat.com/PepperyMediumBrahmancow-max-1mb.gif"
        alt="Loading spinner"
      />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="HOOKED" />

        <Search search={search} />

        <p className="App-intro">Sharing a few of our favourite movies</p>

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );
};

export default App;
