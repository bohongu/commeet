<p display='flex'>
<img src='https://user-images.githubusercontent.com/91203029/202180085-d70075b9-f1ac-4f15-b566-1de909cb5a3c.png' width='250'/>

<img src='https://user-images.githubusercontent.com/91203029/202180265-a84da78a-1ae8-4040-abce-2fe7b0ff48df.png' width='250'/>

<img src='https://user-images.githubusercontent.com/91203029/202180206-e740744a-34b3-4489-95ac-658e6591c004.png' width='250'/>
</p>
## Project Stack

- React
- React Router v6
- Redux
- Redux-toolkit
- styled-components
- firebase

## 기능

- 로그인 시
  - 모든 게시물 보여주기
    - 게시물의 작성자의 프로필, 본문, 사진, 업로드 시간 출력
    - 게시물의 authorId를 비교하여 삭제 / 수정 보여주기
    - 댓글 보여주기
      - 댓글 작성자의 프로필, 댓글, 업로드 시간 출력
      - 댓글의 commentAuthorId를 비교하여 삭제 보여주기
  - 네비게이션
    - 다크모드
      - styled-components 활용
    - 글쓰기
      - 본문, 사진 업로드
    - 프로필
      - 프로필 사진, 닉네임 변경
      - 나의 총 게시물 수, 게시물 썸네일 출력
    - 로그아웃
- 비 로그인 시
  - 인증 폼 보여주기
    - 정규식을 활용하여 비밀번호에 유효성 검사 추가
    - 구글, 깃허브 로그인
