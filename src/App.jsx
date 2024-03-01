import { useEffect, useState } from "react";
import { Col, Row, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Img from "./assets/image/the-movie-verse.png";
// import avengersData from './moviesData';

import Card from "react-bootstrap/Card";
import { RiHeartAddLine } from "react-icons/ri";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${
      import.meta.env.VITE_API_KEY
    }`;
    try {
      const response = await fetch(url);
      const responseJson = await response.json();
      // console.log(responseJson);

      if (responseJson.Search) {
        setMovies(responseJson.Search);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // getMovieRequest('alvin')
  // console.log(avengersData);

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  const addToFavorites = (value) => {
    // console.log(value);
    const newFavorites = [...favorites, value];
    setFavorites(newFavorites);
  };

  console.log("favoriteeeeeee", favorites);

  return (
    <>
      {/* Navbar */}
      <Navbar expand="lg" className="">
        <Container>
          <Navbar.Brand href="#">🌐 Movie-Verve</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        {/* Hero section 1 */}
        <Col className="d-flex pt-5 align-items-center ">
          <Row>
            <h1 className="hero-text">Welcome to the Movie Verse</h1>
            <p className="hero-description">
              Find and save your favorite movies
            </p>
          </Row>
          <Row>
            <Image src={Img} alt="Hero image" />
          </Row>
        </Col>

        {/* Hero section 2 */}
        <div className="row d-flex align-items-center mt-4 ">
          <div className="col">
            <h2>MOVIE LIST:</h2>
          </div>
          <div className="col">
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search a movie..."
              className="form-control"
            />
          </div>
        </div>

        <div className="row nowrap ">
          {movies.map((movie) => {
            return (
              <Card
                className="pt-3 m-3"
                key={movie.imdbID}
                style={{ width: "18rem" }}
              >
                <Card.Img variant="top" src={movie.Poster} />
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <Card.Title>
                    {movie.Title} ({movie.Year})
                  </Card.Title>
                  <RiHeartAddLine
                    onClick={() => addToFavorites(movie)}
                    className="like-icon"
                  />
                </Card.Body>
              </Card>
            );
          })}
        </div>

        {/* Favorite list section */}
        <div className="row d-flex align-items-center mt-4 ">
          <div className="col">
            <h2>Favorites Movies:</h2>
          </div>
          
        </div>
        <div className="row nowrap ">
          {favorites.map((movie) => {
            return (
              <Card
                className="pt-3 m-3"
                key={movie.imdbID}
                style={{ width: "18rem" }}
              >
                <Card.Img variant="top" src={movie.Poster} />
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <Card.Title>
                    {movie.Title} ({movie.Year})
                  </Card.Title>
                  <RiHeartAddLine
                    onClick={() => addToFavorites(movie)}
                    className="like-icon"
                  />
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default App;
