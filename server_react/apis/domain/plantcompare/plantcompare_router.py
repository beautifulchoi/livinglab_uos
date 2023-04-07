
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from starlette import status

from database import get_db
from domain.plantcompare import plantcompare_crud, plantcompare_schema
from domain.comment.comment_schema import Comment
from typing import List

router = APIRouter(
    prefix="/compare",
)


@router.post("/create", status_code=status.HTTP_201_CREATED)
def create_compare(_PlantCompare_create: plantcompare_schema.PlantCompareCreate,
                   db: Session = Depends(get_db)):

    plantcompare_crud.create_compare(
        db, PlantCompare_create=_PlantCompare_create)  # user는 일단 제외했음


@router.get("/list", response_model=List[plantcompare_schema.PlantCompare])
def read_compare_list(db: Session = Depends(get_db)):
    _compare_list = plantcompare_crud.get_compare_list(db)
    return _compare_list


@router.get("/detail/{compare_id}", response_model=plantcompare_schema.PlantCompare)
def read_compare(compare_id: int, db: Session = Depends(get_db)):
    compare = plantcompare_crud.get_compare(db, compare_id=compare_id)
    return compare


# 삭제시 댓글도 삭제되도록 수정요망
@router.delete("/delete/", status_code=status.HTTP_204_NO_CONTENT)
def delete_compare(_Compare_delete: plantcompare_schema.PlantCompareDelete,
                   db: Session = Depends(get_db)):
    db_compare = plantcompare_crud.get_compare(
        db, compare_id=_Compare_delete.compare_id)
    if not db_compare:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="데이터를 찾을수 없습니다.")

    plantcompare_crud.delete_compare(db=db, db_compare=db_compare)

# Compare와 연결된 모든 Comment 데이터를 가져오는 API 라우터


@router.get("/{compare_id}/comments", response_model=List[Comment])
def read_comments_by_compare_id(compare_id: int, db: Session = Depends(get_db)):
    db_compare = plantcompare_crud.get_compare(db, compare_id=compare_id)
    if not db_compare:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail="해당 Compare를 찾을 수 없습니다.")

    return plantcompare_crud.get_comments(db, compare_id)
