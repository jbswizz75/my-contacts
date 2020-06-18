/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import axios from 'axios';
import { api } from '../../config/key';
// import Display from './Display';

class filmDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.params = {
      api_key: api,
      language: 'en-US',
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: this.params,
    })
      .then((res) => {
        this.setState({ data: res.data, isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;
    if (isLoading) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }
    return (
      <div>
        <Row>
          <Col style={{ height: 100 }} md={12}>
            <Image src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`} fluid />
            <div style={{
              position: 'absolute',
              top: 0,
              height: '100vh',
              width: '100%',
              backgroundColor: 'black',
              opacity: 0.5,
            }}
            />
          </Col>
        </Row>
        <Container>
          <Row className="mt-5">
            <Col xs={10} md={8}>
              <h1 style={{ color: 'white' }}>{data.original_title}</h1>
              <small style={{ color: 'white' }}>{data.release_date}</small>
              <p style={{ color: 'white' }}>{data.overview}</p>
              <a style={{ color: 'white' }} href={data.homepage}>Home Page</a>
            </Col>
            <Col xs={2} md={4}>
              <Image src={`https://image.tmdb.org/t/p/original/${data.poster_path}`} fluid />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default filmDetails;
