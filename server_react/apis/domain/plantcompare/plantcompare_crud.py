from datetime import datetime

from sqlalchemy.orm import Session

from domain.plantcompare.plantcompare_schema import PlantCompareCreate
from models import PlantCompare, Comment, UserList


def get_compare_list(db: Session):
    compare_list = db.query(PlantCompare).all()
    return compare_list


def create_compare(db: Session, PlantCompare_create: PlantCompareCreate):
    db_comment = PlantCompare(tip=PlantCompare_create.tip,
                              left_Species_name=PlantCompare_create.left_Species_name,
                              right_Species_name=PlantCompare_create.right_Species_name,
                              title=PlantCompare_create.title)
    db.add(db_comment)
    db.commit()


def get_compare(db: Session, compare_id: int):
    return db.query(PlantCompare).get(compare_id)


def delete_compare(db: Session, db_compare: PlantCompare):
    db.delete(db_compare)
    db.commit()


def get_comments(db: Session, compare_id: int):
    return db.query(Comment).join(PlantCompare)\
        .filter(PlantCompare.compare_id == compare_id)\
        .order_by(Comment.create_date.desc())\
        .all()
