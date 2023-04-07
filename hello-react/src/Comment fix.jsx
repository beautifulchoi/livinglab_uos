import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import './Comment.css';

function WriteComment({user, handleCommentSubmit}){ // id 전달 부분 삭제 , props에 유저 id정보 가져오는 부분 추가해야함

  const [comment, setComment] = useState("");

  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async(event) => {
    event.preventDefault();

    handleCommentSubmit(comment);

    setComment("");//

  };
  return(
    <div className="write-comment">
      <form>
        <div className="input-group">
          <span>user.id</span> {/* user.name등으로 수정할 것 */}
        </div>
      </form> 
      <textarea placeholder="댓글" value={comment} onChange={handleCommentChange} />
      <button type="submit" onClick={handleSubmit}>글쓰기</button>
    </div>
  );
}

function Comment({data,onRemove }) { 
  return (
    <div className="comment"> 
      <b>{data.nickname}: </b> <span>[{data.content}]</span>
      <button onClick={() => onRemove(data.comment_id)}>삭제</button>
    </div>
  );
}

function CommentList({datas, onRemove}) { //users는 write해준 후 가져오면 된다.
  return (
    <div>
      {datas.map((data) => (
        <Comment
          data={data}
          key={data.comment_id}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
} 

function CommentBoard({datas,onRemove}){
  return(
    <div>
      <h3>Comments:</h3>
      <CommentList datas={datas} onRemove={onRemove}/>
    </div>
  );
}

function CommentBlock(){ 
  const [datas, setDatas] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');


  async function getData(id) { 
    try {
      await axios.get(`http://localhost:8000/compare/${id}/comments`).then((response) =>{
        
        setDatas(response.data);
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function postData(data) {
    try {
      const response = await axios.post('http://localhost:8000/comment/create', data);
      console.log("응답", response);
    } catch (error) {
      console.error(error);
    }
  };


  async function deleteData(data) {
    try {
      //console.log("삭제로그: ", data)
      await axios.delete('http://localhost:8000/comment/delete', {
        data: {
          "comment_id": data.comment_id
        }
      }).then((response) => {
        console.log("데이터 삭제");
        //console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  };


  //새로고침시 댓글리스트 가져오기
  useEffect(() => {
    getData(3); //id 값에 해당하는 거로 상위 컴포넌트의 props를 가져오기
  },[]);
/*
  useEffect(() => {
    getData(compare_plant.id);
  }, [compare_plant.id]); 챗gpt가 일케하래
*/

  const handleCommentSubmit = (comment) => {
    
    if (comment!==""){
    const newData={content:comment, compare_id: 3} //user id는 user 구축 후 추가, compare id 수정해야함
    postData(newData);


    getData(3);
    }
    else{
      alert('코멘트를 작성해주세요');
    }    
  };

  const openModal = (target) => {
    setTargetUser(target);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setTargetUser(null);
    setIsModalOpen(false);
    setPassword("");
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === String(targetUser.compare_id)) { //유저 비번에 대한 정보는 api 만들어야하므로 일단 코멘트 아디로
      setDatas(datas.filter((data) => data.comment_id !== targetUser.comment_id));
      //댓글 삭제 api 가져와야함
      deleteData(targetUser);
      console.log(datas);
      closeModal();
    } else {
      alert('비밀번호가 일치하지 않습니다');
      setPassword("");
    }
  };
  
  const onRemove = (id) => {
    const target = datas.find((data) => data.comment_id === id);

    if (!target) {
      alert('해당하는 댓글이 없습니다');
      return;
    }
    openModal(target);
  };

  
  const onCancel = () => {
    setTargetUser(null);
    setIsModalOpen(false);
  };

  const nextId = useRef(0);

  return(
    <div>
      <WriteComment handleCommentSubmit={handleCommentSubmit} nextId={nextId} />
      <CommentBoard datas={datas} onRemove={onRemove} />
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

export default CommentBlock;
