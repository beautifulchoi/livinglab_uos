import datetime
from typing import Optional
from pydantic import BaseModel, validator
"""
댓글 데이터를 위한 api 스키마 구축
"""


class CommentCreate(BaseModel):
    content: str
    compare_id: int

    @validator('content')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v


class Comment(BaseModel):
    comment_id: int
    compare_id: int
    user_id: Optional[int] = None
    # user_id: int
    content: str
    create_date: datetime.datetime

    class Config:
        orm_mode = True


class CommentUpdate(CommentCreate):
    comment_id: int


class CommentDelete(BaseModel):
    comment_id: int


class CommentClear(BaseModel):
    compare_id: int
