import Main from 'components/layout/Main';
import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';
import styled from 'styled-components';
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
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const onChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const emailRegExp =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    try {
      if (newAccount) {
        if (!emailRegExp.test(email)) {
          setEmailError('잘못된 형식의 이메일 주소입니다.');
        }
        if (password === confirm) {
          if (!passwordRegExp.test(password) || !passwordRegExp.test(confirm)) {
            setPasswordError(
              '비밀번호는 문자, 숫자, 특수 문자 조합으로 8자 이상',
            );
          } else {
            // 회원가입 후 로그인 하는 로직
            await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(auth.currentUser, { displayName: nickname });
          }
        } else {
          setPasswordError('비밀번호가 일치하지 않습니다');
        }
      } else {
        // 로그인
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.log(error);
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
        default:
          return;
      }
      signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <Main>
      <FormWrapper onSubmit={onSubmit}>
        <h1>Commeet</h1>
        <AuthInput>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="text"
            name="email"
            required
            placeholder="이메일"
            onChange={onChange}
            value={email}
          />
          <ErrorMessage>{emailError}</ErrorMessage>
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
              <ErrorMessage>{passwordError}</ErrorMessage>
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

          <button>{newAccount ? '회원가입' : '로그인'}</button>
        </AuthInput>

        <SocialLogin>
          <button onClick={onSocial} name="google">
            구글 로그인
          </button>
          <button onClick={onSocial} name="github">
            깃허브 로그인
          </button>
        </SocialLogin>
        <AuthToggle onClick={toggleAccount}>
          {newAccount ? '로그인하기' : '회원가입하기'}
        </AuthToggle>
      </FormWrapper>
    </Main>
  );
};

export default Auth;

const FormWrapper = styled.form`
  padding: 2.5%;
  width: 350px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    text-align: center;
    font-weight: bold;
    font-size: 1.75rem;
  }
`;

const AuthInput = styled.div`
  margin: 15% 0;
  * {
    margin: 3.5% 0;
  }
  input {
    height: 35px;
  }
  button {
    height: 30px;
  }
`;

const ErrorMessage = styled.div`
  margin: 0;
  width: 100%;
  color: red;
  text-align: center;
`;

const SocialLogin = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid black;
  padding: 7% 0;
  margin-bottom: 7%;
  button {
    width: 40%;
  }
`;

const AuthToggle = styled.div`
  text-align: center;
`;
