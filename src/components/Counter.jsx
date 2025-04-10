import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/slices/counterSlice';

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <h2>Redux Counter Example</h2>
      <div className="counter-value">
        <span>Current value: {count}</span>
      </div>
      <div className="counter-buttons">
        <button 
          className="btn btn-primary me-2" 
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button 
          className="btn btn-primary me-2" 
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => dispatch(incrementByAmount(5))}
        >
          Add 5
        </button>
      </div>
    </div>
  );
};

export default Counter; 