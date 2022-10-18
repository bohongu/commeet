import React, { useState } from 'react';

const Home = () => {
  const [title, setTitle] = useState('');
  const [commeet, setCommeet] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        return setTitle(value);
      case 'commeet':
        return setCommeet(value);
      default:
        return;
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">제목</label>
      <input name="title" id="title" value={title} onChange={onChange} />
      <label htmlFor="commeet">본문</label>
      <input name="commeet" id="commeet" value={commeet} onChange={onChange} />
      <label htmlFor="image">사진</label>
      <input id="image" type="file" />
      <button>업로드</button>
    </form>
  );
};

export default Home;
