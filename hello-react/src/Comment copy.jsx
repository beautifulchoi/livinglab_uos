import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';

function WriteComment({handleCommentSubmit, nextId}){ //정보 전달은 상위 컴포넌트에서
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();

    handleCommentSubmit(nextId.current, nickname, password, comment);
    setNickname("");//
    setComment("");//
    setPassword("");//
    nextId.current += 1;//백엔드 서버주소 오면 삭제해야함 -> 동작 확인하면 삭제
    
  
  //서버로 댓글 정보 데이터 전송
  const data = {id: nextId.current, nickname:nickname, password:password, comment:comment};

  async function postData() {
      try {
        await axios.post('http://localhost:8000/data', data).then((response) =>{
          console.log(response);
          console.log("글쓰기 잘됨");
          setNickname("");
          setComment("");
          setPassword("");
          nextId.current += 1;
        });
      } catch (error) {
        console.error(error);
      }
    };
  //postData();
  // axios.post('http://localhost:8000/data', data)
  //   .then(response => {
  //     // The comment was successfully submitted to the server
  //     // Do something, e.g. clear the input fields or show a success message
  //     console.log(response);
  //     setNickname("");
  //     setComment("");
  //     setPassword("");
  //     nextId.current += 1;
  //   })
  //   .catch(error => {
  //     // There was an error submitting the comment to the server
  //     // Do something, e.g. show an error message
  //     console.log(error);
  //     alert(error);
  //   });
  };
  return(
    <div className="write-comment">
      <form>
        <div className="input-group">
          <input type="text" placeholder="닉네임" value={nickname} onChange={handleNicknameChange} />
          <input type="text" placeholder="비밀번호" value={password} onChange={handlePasswordChange} /> 
        </div>
      </form> 
      <textarea placeholder="댓글" value={comment} onChange={handleCommentChange} />
      <button type="submit" onClick={handleSubmit}>글쓰기</button>
    </div>
  );
}

function User({ user,onEdit,onRemove }) {
  return (
    <div>
      <b>{user.nickname}: </b> <span>[{user.comment}]</span>
      <button onClick={() => onEdit(user)}>편집</button> {/*onEdit 수정해아함 */}
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

function UserList({users, onEdit, onRemove}) { //users는 write해준 후 가져오면 된다.
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onEdit={onEdit}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
} //수정해야함 

function CommentBoard({users, onEdit, onRemove}){
  return(
    <div>
      <h3>Comments:</h3>
      <UserList users={users} onRemove={onRemove} onEdit={onEdit}/>
    </div>
  );
}

function Comment(){ 
  const [users, setUsers] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');

  //새로고침시에만 댓글리스트 가져오기
  useEffect(() => {
    async function getData() {
      try {
        await axios.get('http://localhost:8000/list').then((response) =>{
          
          setUsers(response.data);
          console.log("getData!!");
        });
      } catch (error) {
        console.error(error);
      }
    }
    console.log("새로고침");
    getData();
    //postData();
  },[]);

  //댓글 변경시 서버 업데이트
  useEffect(() => {
    async function postData() {
      try {
        await axios.post('http://localhost:8000/list').then((response) =>{
          console.log(response);
          setUsers(response.data);
          console.log("postData!!");
        });
      } catch (error) {
        console.error(error);
      }
    }
    console.log("댓글 정보 변경");
    console.log(users);
    postData();
  },[users]);

  const handleCommentSubmit = (id,nickname, password,comment) => {
    if ((nickname!=="")&&(comment!=="")&&(password!=="")){
    const newUser = {id:id, nickname: nickname, password:password, comment: comment, isEditing:false};
    setUsers([...users, newUser]);
    }
    else if((nickname==="")){
      alert('닉네임을 입력하세요');
    }
    else if((comment==="")){
      alert('코멘트를 작성해주세요');
    }
    else if((password==="")){
      alert('비밀번호를 입력하세요');
    }
    
  };

  const openModal = (id) => {
    const target = users.find((user) => user.id === id);
    setTargetUser(target);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTargetUser(null);
    setIsModalOpen(false);
    setPassword('');
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === targetUser.password) {
      setUsers(users.filter((user) => user.id !== targetUser.id));
      closeModal();
    } else {
      alert('비밀번호가 일치하지 않습니다');
      setPassword("");
    }
  };
  
  const onRemove = (id) => {
    const target = users.find((user) => user.id === id);

    if (!target) {
      alert('해당하는 댓글이 없습니다');
      return;
    }
    openModal(id);
  };

  const onEdit = (id) =>{ //에러발생 -> 수정 예정
    const updatedUsers = [...users];
    const targetIdx = updatedUsers.findIndex(item=> item.id === id);
    const newComment=1
    updatedUsers[targetIdx]=newComment;
    setUsers(updatedUsers);
  } ;
  
  const onCancel = () => {
    setTargetUser(null);
    setIsModalOpen(false);
    setPassword("");
  };

  const nextId = useRef(0);
  //console.log(users)
  return(
    <div>
      <WriteComment handleCommentSubmit={handleCommentSubmit} nextId={nextId} />
      <CommentBoard users={users} onRemove={onRemove} onEdit={onEdit}/>
      {isModalOpen && (
        <Modal password={password} handlePasswordChange={handlePasswordChange} onConfirm={handlePasswordSubmit} onCancel={onCancel}/> 
        
      )}
    </div>
  );
}

function Modal({password, handlePasswordChange, onConfirm, onCancel}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <input type="text" placeholder="비밀번호" value={password} onChange={handlePasswordChange} />
        <div className="modal-buttons">
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
