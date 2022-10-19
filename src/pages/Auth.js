import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../Firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);
      case 'confirm':
        return setConfirm(value);
      case 'nickname':
        return setNickname(value);
      default:
        return;
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const reg = '^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{10,}$';
    try {
      if (newAccount) {
        if (password === confirm) {
          if (!reg.match(password) || !reg.match(confirm)) {
            setError('비밀번호는 문자, 숫자, 특수 문자 조합으로 10자 이상');
          }
          await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(auth.currentUser, { displayName: nickname });
        } else {
          setError('비밀번호가 일치하지 않습니다');
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {}
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
