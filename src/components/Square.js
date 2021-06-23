import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

import './Square.css'

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  // const [squareValue, setSquareValue] = useState(props.value);
  // const click = () => {
  //   setSquareValue('X');
  // };

  return <button
    className='square' id={props.id} onClick={props.onClickCallback}
  >
    {props.value}
  </button>
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
