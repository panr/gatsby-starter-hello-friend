import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CustomDemo = ({ greeting }) => {
  const [count, setCount] = useState(0)
  return (
    <>
      <strong>
        Hey, {greeting}! You clicked {count} times.
      </strong>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  )
}

CustomDemo.propTypes = {
  greeting: PropTypes.string,
}

export default CustomDemo