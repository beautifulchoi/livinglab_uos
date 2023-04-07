from datetime import datetime

from sqlalchemy.orm import Session

from domain.comment.comment_schema import CommentCreate, CommentUpdate
from models import PlantCompare, Comment, UserList


def get_comment_list(db: Session):
    comment_list = db.query(Comment)\
        .order_by(Comment.create_date.desc())\
        .all()  # 데베 안만들어졌는데 고를라고 하니까 문제생김
    return comment_list


def create_comment(db: Session, Comment_create: CommentCreate):
    db_comment = Comment(content=Comment_create.content,
                         compare_id=Comment_create.compare_id,
                         create_date=datetime.now())
    db.add(db_comment)
    db.commit()


def get_comment(db: Session, comment_id: int):
    return db.query(Comment).get(comment_id)


def delete_comment(db: Session, db_comment: Comment):
    db.delete(db_comment)
    db.commit()


# def delete_all(db: Session, compare_id: int):
#     subquery = db.query(Comment).join(PlantCompare)\
#         .filter(PlantCompare.compare_id == compare_id)\
#         .subquery()
#     db.query(Comment.comment_id).filter(Comment.comment_id.in_(
#         subquery)).delete(synchronize_session=False)
#     db.commit()
