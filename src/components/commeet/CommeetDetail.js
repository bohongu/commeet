// import { db, storage } from 'Firebase';
// import { deleteDoc, doc } from 'firebase/firestore';
// import { deleteObject, ref } from 'firebase/storage';
// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import CommeetUpdate from './CommeetUpdate';

// const CommeetDetail = () => {
//   const [setting, showSetting] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);
//   const userInfo = useSelector((state) => state.user.userInfo);
//   const dbRef = doc(db, 'commeets', `${commeet.id}`);
//   const owner = commeet.authorId === userInfo.uid;
//   const onSetting = () => showSetting(true);
//   const onCancel = () => showSetting(false);
//   const onDelete = async () => {
//     // eslint-disable-next-line no-restricted-globals
//     const ok = confirm('삭제 고고?');
//     if (ok) {
//       await deleteDoc(dbRef);
//       await deleteObject(ref(storage, commeet.fileUrl));
//     }
//     showSetting(false);
//   };
//   const onUpdate = () => {
//     setShowUpdateForm(true);
//   };

//   return (
//     <>
//       {showUpdateForm && (
//         <CommeetUpdate
//           dbRef={dbRef}
//           showSetting={showSetting}
//           setShowUpdateForm={setShowUpdateForm}
//         />
//       )}
//       {owner && <div onClick={onSetting}>환경설정</div>}
//       {setting && (
//         <>
//           <div onClick={onDelete}>삭제</div>
//           <div onClick={onUpdate}>수정</div>
//           <div onClick={onCancel}>취소</div>
//         </>
//       )}
//     </>
//   );
// };

// export default CommeetDetail;
