import datetime
from typing import Optional
from pydantic import BaseModel, validator
"""
식물 비교 페이지를 위한 api 스키마 구축
"""


class PlantCompareCreate(BaseModel):
    tip: str
    left_Species_name: str
    right_Species_name: str
    title: Optional[str] = None

    @validator('tip', 'right_Species_name', 'left_Species_name')
    def not_empty(cls, v):
        if not v or not v.strip():
            raise ValueError('빈 값은 허용되지 않습니다.')
        return v

    @validator('right_Species_name')
    def compare_match(cls, v, values):
        if 'left_Species_name' in values and v == values['left_Species_name']:
            raise ValueError('비교할 식물이 똑같습니다')
        return v


class PlantCompare(BaseModel):
    compare_id: int
    left_Species_name: str
    right_Species_name: str
    title: str
    tip: str

    class Config:
        orm_mode = True


class PlantCompareDelete(BaseModel):
    compare_id: int
