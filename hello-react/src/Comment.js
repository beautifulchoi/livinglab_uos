import React, { useState } from 'react';

function Comment(){
  const [nickname, setNickname] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (nickname && comment) {
      const newComment = { nickname, comment, likes: 0, dislikes: 0 };
      setComments([...comments, newComment]);
      setNickname('');
      setComment('');
    }
    else if(!nickname || !comment) {
         alert('닉네임과 코멘트 모두 작성해주세요');//여기 수정해야함 => 텍스트 메세지 내부에서 에러발생하도록
     };
}

  const handleLikeClick = (index) => {
    const updatedComments = [...comments];
    if (updatedComments[index].hasLiked) {
      updatedComments[index].likes -= 1;
      updatedComments[index].hasLiked = false;
    } else {
      updatedComments[index].likes += 1;
      updatedComments[index].hasLiked = true;
      if (updatedComments[index].hasDisliked) {
        updatedComments[index].dislikes -= 1;
        updatedComments[index].hasDisliked = false;
      }
    }
    setComments(updatedComments);
  };

  const handleDislikeClick = (index) => {
    const updatedComments = [...comments];
    if (updatedComments[index].hasDisliked) {
      updatedComments[index].dislikes -= 1;
      updatedComments[index].hasDisliked = false;
    } else {
      updatedComments[index].dislikes += 1;
      updatedComments[index].hasDisliked = true;
      if (updatedComments[index].hasLiked) {
        updatedComments[index].likes -= 1;
        updatedComments[index].hasLiked = false;
      }
    }
    setComments(updatedComments);
  };

  const handleCommentEdit = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].isEditing = true;
    setComments(updatedComments);
  };

  const handleCommentUpdate = (index, newComment) => {
    const updatedComments = [...comments];
    updatedComments[index] = newComment;
    setComments(updatedComments);
  };

  const handleCancelEdit = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].isEditing = false;
    setComments(updatedComments);
  };

  return (
    <div>
      <h3>Leave a comment:</h3>
      <input type="text" placeholder="닉네임" value={nickname} onChange={handleNicknameChange} />
      <br />
      <textarea placeholder="댓글" value={comment} onChange={handleCommentChange} />
      <br />
      <button onClick={handleCommentSubmit}>글쓰기</button>
      <hr />
      <h3>Comments:</h3>
      {comments.map((comment, index) => (
        <div key={index}>
          {comment.isEditing ? (
            <div>
              <input
                type="text"
                placeholder="Nickname"
                value={comment.nickname}
                onChange={(e) => {
                  const updatedComment = { ...comment, nickname: e.target.value };
                  handleCommentUpdate(index, updatedComment);
                }}
              />
              <br />
              <textarea
                placeholder="Comment"
                value={comment.comment}
                onChange={(e) => {
                  const updatedComment = { ...comment, comment: e.target.value };
                  handleCommentUpdate(index, updatedComment);
                }}
              />
              <br />
              <button onClick={() => handleCommentUpdate(index, { ...comment, isEditing: false })}>Update</button>
              <button onClick={() => handleCancelEdit(index)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p>
                <strong>{comment.nickname}:</strong> {comment.comment}
              </p>
              <button onClick={() => handleLikeClick(index)}>👍 {comment.likes}</button>
              <button onClick={() => handleDislikeClick(index)}>👎 {comment.dislikes}</button>
              <button onClick={() => handleCommentEdit(index)}>편집</button>
              <hr />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Comment;
