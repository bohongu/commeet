import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../Firebase';

const Auth = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirm: '',
    nickname: '',
  });
  const { email, password, confirm, nickname } = inputs;
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const reg =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    try {
      if (newAccount) {
        if (password === confirm) {
          if (!reg.test(password) || !reg.test(confirm)) {
            setError('비밀번호는 문자, 숫자, 특수 문자 조합으로 8자 이상');
          } else {
            // 회원가입 후 로그인 하는 로직
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: nickname });
          }
        } else {
          setError('비밀번호가 일치하지 않습니다');
        }
      } else {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch {}
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
        default:
          return;
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
      {newAccount && (
        <>
          <label htmlFor="confirm">비밀번호 확인</label>
          <input
            id="confirm"
            type="password"
            name="confirm"
            required
            placeholder="비밀번호 확인"
            onChange={onChange}
            value={confirm}
          />
          <label htmlFor="nickname">닉네임</label>
          <input
            id="nickname"
            type="text"
            name="nickname"
            required
            placeholder="닉네임"
            onChange={onChange}
            value={nickname}
          />
        </>
      )}
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
