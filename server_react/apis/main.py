from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from domain.comment import comment_router
from domain.plantcompare import plantcompare_router
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add the origin of the React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# my_user = User(id=0, email="cyj", password="1234")
# my_item = Item(id=1, title="new")
# # print(my_user.items)
# my_user.item.append(my_item)
# print(my_user.item)


class Item(BaseModel):
    name: str
    description: str = None


items = []


app.include_router(comment_router.router)
app.include_router(plantcompare_router.router)
