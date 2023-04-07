from fastapi import FastAPI
from typing import List
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Add the origin of the React app
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Comment(BaseModel):
    id: int
    nickname: str
    password: str
    comment: str


comments = []


# @app.route("/data")
# async def checker():
#     return "OK"


@app.post("/data")
async def create_comment(comment: Comment):
    comments.append(comment)
    return {"status": "success"}


@app.get("/data")
async def read_comments():
    return comments
