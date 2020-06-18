import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar } from 'react-icons/ai';

const Rating = ({ rate }) => (
  <div style={{
    display: 'flex',
    marginTop: 10,
    width: 50,
    height: 50,
    fontSize: 14,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
    borderRadius: 50,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,.5)',
  }}
  >
    <div>
      <AiFillStar size={15} color="#ffbf00" />
    </div>
    <div>
      <p>{rate}</p>
    </div>
  </div>
);

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default Rating;
