import React ,{ Component } from 'react';
import Nav from './Nav';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import Pagination from './Pagination';

class App extends Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      search: '',
      totalResults: 0,
      currentPage: 1,
    }
    this.apiKey = process.env.REACT_APP_API
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}&language=pt-BR`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results], totalResults: data.total_results})
      console.log(data);
    })
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value })
  }

  nextPage = (pageNumber) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.search}&page=${pageNumber}&language=pt-BR`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results], currentPage: pageNumber })
      console.log(data);
    })
  }

    render(){
      const numberPages = Math.floor(this.state.totalResults / 20);

        return (
          <div className="App">
            <Nav />
            <SearchArea handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            <MovieList movies={this.state.movies} />
            { this.state.totalResults > 20 ? <Pagination pages={numberPages} nextPage={this.nextPage} currentPage={this.state.currentPage} /> : '' }
          </div>
        );
      }
    }

export default App;
