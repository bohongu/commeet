import React, { useState } from 'react';

const CommetForm = () => {
  const [comment, setComment] = useState('');
  const onChange = (event) => {
    setComment(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setComment('');
  };
  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={comment} onChange={onChange} />
      <button>작성</button>
    </form>
  );
};

export default CommetForm;
