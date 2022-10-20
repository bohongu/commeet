import React from 'react';

const Commeet = ({ commeet }) => {
  return (
    <div>
      <h3>{commeet.title}</h3>
      <h4>{commeet.commeet}</h4>
      <h4>{commeet.author}</h4>
      <h5>{commeet.createdAt}</h5>
    </div>
  );
};

export default Commeet;
