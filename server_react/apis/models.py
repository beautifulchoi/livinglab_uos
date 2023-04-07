from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean, VARCHAR
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

"""
ORM 모델
"""


class PlantCompare(Base):
    compare_id = Column(Integer, autoincrement=True,
                        primary_key=True, index=True)  # 이건 필요함 -> 한 유저가 여러 팁창 쓸수도 있으니까
    left_Species_name = Column(VARCHAR(255))
    right_Species_name = Column(VARCHAR(255))
    title = Column(VARCHAR(255))
    tip = Column(Text)


class Comment(Base):
    # mysql에서는 autoincrement 키워드 추가
    comment_id = Column(Integer, primary_key=True, index=True)
    compare_id = Column(Integer,
                        ForeignKey('plantcompare.compare_id'))
    content = Column(Text)
    create_date = Column(DateTime, default=datetime.now())
    user_id = Column(Integer)  # 나중에 외부 UserList user id와 외래키 연결


class UserList(Base):
    User_id = Column(Integer, autoincrement=True,
                     primary_key=True, index=True)
    User_nickname = Column(String(255),
                           unique=True, primary_key=True, nullable=False)
    User_password = Column(String, nullable=False)
    Is_superuser = Column(Boolean(), default=False)
    Createtime = Column(DateTime, default=datetime.now())
    Access_count = Column(Integer, default=0)
