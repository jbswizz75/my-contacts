import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Display from './Display';

class Counter extends Component {
  constructor(props) {
    super(props);

    // Initial State
    this.state = {
      data: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    fetch('https://api.themoviedb.org/3/discover/movie?api_key=43ef6153920975271a20000df094734d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
      .then((response) => response.json())
      .then((data) => this.setState({ data, isLoading: true }));
  }

  toogleView(theme) {
    fetch(`https://api.themoviedb.org/3/discover/${theme}?api_key=43ef6153920975271a20000df094734d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then((response) => response.json())
      .then((data) => this.setState({ data, isLoading: true }));
  }

  handleSubmit(e) {
    e.preventDefault();
    const { input } = this.state;
    console.log(input);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=43ef6153920975271a20000df094734d&language=en-US&query=${input}=&page=1&include_adult=false`)
      .then((response) => response.json())
      .then((data) => this.setState({ data }));
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }


  render() {
    const { data, isLoading, input } = this.state;

    if (!isLoading) {
      return (
        <h1>Is Loading</h1>
      );
    }
    return (
      <div>
        <Button className="button" onClick={() => this.toogleView('movie')} variant="primary">Voir Films</Button>
        <Button onClick={() => this.toogleView('tv')} variant="primary">Voir Séries</Button>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Chercher un Film"
              aria-label="Chercher un Film"
              aria-describedby="basic-addon2"
              value={input}
              onChange={(event) => this.handleChange(event)}
              type="text"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Chercher</Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
        <Display data={data} />
      </div>
    );
  }
}

export default Counter;
