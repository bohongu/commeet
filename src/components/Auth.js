import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../Firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        data = signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onSocial = (event) => {
    const { name } = event.target;
    let provider;
    try {
      switch (name) {
        case 'google':
          provider = new GoogleAuthProvider();
          break;
        case 'github':
          provider = new GithubAuthProvider();
          break;
      }
      signInWithPopup(auth, provider);
    } catch (error) {}
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        name="password"
        required
        placeholder="비밀번호"
        onChange={onChange}
        value={password}
      />
      {error}
      <button>{newAccount ? '회원가입' : '로그인'}</button>
      <span onClick={toggleAccount}>
        {newAccount ? '로그인하기' : '회원가입하기'}
      </span>
      <div>
        <button onClick={onSocial} name="google">
          구글 로그인
        </button>
        <button onClick={onSocial} name="github">
          깃허브 로그인
        </button>
      </div>
    </form>
  );
};

export default Auth;
