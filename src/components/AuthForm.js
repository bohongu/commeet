import React, { useRef } from 'react';

const AuthForm = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();

  return (
    <form>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        type="email"
        required
        placeholder="이메일"
        ref={inputEmail}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        type="password"
        required
        placeholder="비밀번호"
        ref={inputPassword}
      />
      <button>로그인</button>
    </form>
  );
};

export default AuthForm;
