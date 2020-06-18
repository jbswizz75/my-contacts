/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Button,
  InputGroup,
  FormControl,
  Spinner,
} from 'react-bootstrap';
import axios from 'axios';
import { api } from '../../config/key';
import Display from './Display';

class Counter extends Component {
  constructor(props) {
    super(props);
    // Initial State
    this.state = {
      select: null,
      data: null,
      isLoading: false,
    };
    this.params = {
      api_key: api,
      language: 'en-US',
      sort_by: 'popularity.desc',
      include_adult: false,
      include_video: false,
      page: 1,
    };
  }

  componentDidMount() {
    axios.get('https://api.themoviedb.org/3/discover/movie?', {
      params: this.params,
    }).then((res) => {
      this.setState({ data: res.data, isLoading: true });
    });
  }

  toogleView(theme) {
    axios.get(`https://api.themoviedb.org/3/discover/${theme}`, {
      params: this.params,
    })
      .then((res) => {
        this.setState({ data: res.data, isLoading: true });
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { input } = this.state;
    const paramsSubmit = this.params;
    delete paramsSubmit.include_video;
    delete paramsSubmit.sort_by;
    paramsSubmit.query = input;
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: paramsSubmit,
    })
      .then((res) => {
        this.setState({ data: res.data, isLoading: true });
      });
  }

  handleChange(event) {
    this.setState({ input: event.target.value });
  }

  handleChangeSelect(event) {
    this.setState({ select: event.target.value });
    this.displayByGenre(event.target.value);
  }

  displayByGenre(select) {
    console.log(select);
    const paramsSubmit = this.params;
    // const { select } = this.state;
    paramsSubmit.with_genres = select;
    axios.get('https://api.themoviedb.org/3/discover/movie?', {
      params: paramsSubmit,
    })
      .then((res) => {
        this.setState({ data: res.data, isLoading: true });
      });
  }

  topRated() {
    const paramsSubmit = this.params;
    delete paramsSubmit.include_video;
    delete paramsSubmit.sort_by;
    axios.get('https://api.themoviedb.org/3/movie/top_rated', {
      params: paramsSubmit,
    })
      .then((res) => {
        this.setState({ data: res.data, isLoading: true });
      });
  }

  render() {
    const {
      data,
      isLoading,
      input,
      genres,
      select,
    } = this.state;
    if (!isLoading && !genres) {
      return (
        <Spinner animation="border" variant="primary" />
      );
    }
    return (
      <div>
        <div className="mt-3" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button style={{ marginRight: 10 }} className="button" onClick={() => this.toogleView('movie')} variant="primary">Voir Films</Button>
          <Button style={{ marginRight: 10 }} onClick={() => this.toogleView('tv')} variant="primary">Voir Séries</Button>
          <Button style={{ marginRight: 10 }} onClick={() => this.topRated()} variant="primary">Les meilleurs</Button>
          <select value={select} onChange={(event) => this.handleChangeSelect(event)}>
            <option>Categories</option>
            <option value={28}>Action</option>
            <option value={27}>Horreur</option>
            <option value={35}>Comedie</option>
          </select>
        </div>
        <form style={{ paddingRight: 500, paddingLeft: 500 }} onSubmit={(event) => this.handleSubmit(event)}>
          <InputGroup className="mb-3 mt-3">
            <FormControl
              placeholder="Chercher un Film"
              aria-label="Chercher un Film"
              aria-describedby="basic-addon2"
              value={input}
              onChange={(event) => this.handleChange(event)}
              type="text"
            />
          </InputGroup>
        </form>
        <Display data={data} />
      </div>
    );
  }
}

export default Counter;
