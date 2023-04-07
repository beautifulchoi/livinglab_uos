
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from domain.comment import comment_schema, comment_crud
from typing import List

router = APIRouter(
    prefix="/comment",
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_comment(_Comment_create: comment_schema.CommentCreate,
                   db: Session = Depends(get_db)):

    comment_crud.create_comment(
        db, Comment_create=_Comment_create)  # user는 일단 제외했음


@router.get("/list", response_model=List[comment_schema.Comment])
def read_comment_list(db: Session = Depends(get_db)):
    _comment_list = comment_crud.get_comment_list(db)
    return _comment_list


@router.get("/detail/{comment_id}", response_model=comment_schema.Comment)
def read_comment(comment_id: int, db: Session = Depends(get_db)):
    comment = comment_crud.get_comment(db, comment_id=comment_id)
    return comment


@router.delete("/delete/", status_code=status.HTTP_204_NO_CONTENT)
def delete_comment(_Comment_delete: comment_schema.CommentDelete,
                   db: Session = Depends(get_db)):
    db_comment = comment_crud.get_comment(
        db, comment_id=_Comment_delete.comment_id)
    if not db_comment:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="데이터를 찾을수 없습니다.")

    comment_crud.delete_comment(db=db, db_comment=db_comment)


# @router.delete("/delete/{compare_id}", status_code=status.HTTP_204_NO_CONTENT)
# def clear_comments(Comment_clear: comment_schema.CommentClear, db: Session = Depends(get_db)):
#     # if not get_comment(db, comment_id=comment_delete.comment_id):
#     #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="데이터를 찾을 수 없습니다.")

#     comment_crud.delete_all(db, compare_id=Comment_clear.compare_id)

#     return {"message": "삭제 완료"}
