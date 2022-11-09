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
import { FaGoogle, FaGithub } from 'react-icons/fa';

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
            await updateProfile(auth.currentUser, {
              displayName: nickname,
              photoURL: null,
            });
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
    event.preventDefault();
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
          <input
            id="email"
            type="text"
            name="email"
            required
            placeholder="Email"
            onChange={onChange}
            value={email}
          />

          <input
            id="password"
            type="password"
            name="password"
            required
            placeholder="Password"
            onChange={onChange}
            value={password}
          />
          {newAccount && (
            <>
              <input
                id="confirm"
                type="password"
                name="confirm"
                required
                placeholder="Password Confirm"
                onChange={onChange}
                value={confirm}
              />

              <input
                id="nickname"
                type="text"
                name="nickname"
                required
                placeholder="Nickname"
                onChange={onChange}
                value={nickname}
              />
            </>
          )}
          <ErrorMessage>{passwordError}</ErrorMessage>
          <ErrorMessage>{emailError}</ErrorMessage>
          <button>{newAccount ? 'Create Account' : 'Sign In'}</button>
        </AuthInput>
        {!newAccount ? (
          <>
            <SocialTitle>Social Account</SocialTitle>
            <SocialLogin>
              <SocialButton onClick={onSocial} name="google">
                <FaGoogle />
              </SocialButton>
              <SocialButton onClick={onSocial} name="github">
                <FaGithub />
              </SocialButton>
            </SocialLogin>
          </>
        ) : null}
        <AuthToggle onClick={toggleAccount}>
          {newAccount ? 'Sign In' : 'Create Account'}
        </AuthToggle>
      </FormWrapper>
    </Main>
  );
};

export default Auth;

const FormWrapper = styled.form`
  padding: 2.5%;
  width: 350px;
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
  margin-top: 15%;
  margin-bottom: 7.5%;
  * {
    margin: 3.5% 0;
  }
  input {
    height: 35px;
    padding-left: 5px;
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
  margin-bottom: 5px;
`;

const SocialTitle = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 14px;
  margin: 8px 0px;
  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const SocialLogin = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7.5% 0;
  margin-bottom: 7%;
`;

const SocialButton = styled.button`
  margin: 0 1.125rem;
  font-size: 1.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  border: 1px solid black;
  background-color: none;
  padding: 5px;
  border-radius: 50%;
`;

const AuthToggle = styled.div`
  cursor: pointer;
  text-align: center;
  :hover {
    text-decoration: underline;
  }
`;
