from datetime import datetime
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Text, Optional
from uuid import uuid4


# Post Model - Data schema
class Post(BaseModel):
    id: Optional(str)
    title: str
    author: str
    content: Text
    create_at: datetime = datetime.now()
    published_at: Optional(datetime)
    published: bool = False


app = FastAPI()
posts = []


@app.get("/")
def read_root():
    return {"Welcome": "Welcome to the root directory of the API. :)"}


@app.get("/posts/{post_id}")
def get_posts(post_id: str):
    for post in posts:
        if post["id"] == post_id:
            return posts[post_id]
    raise HTTPException(status_code=404, detail="Post Not Found")


@app.post("/posts")
def save_post(post: Post):
    post.id = str(uuid4())
    posts.append(post.dict())
    print(post)
    return post[-1]


@app.delete("/posts/{post_id}")
def delete_posts(post_id: str):
    for index, post in enumerate(posts):
        if post["id"] == post_id:
            posts.pop(index)
            return {"message": f"Post:{post_id} was deleted successfully"}
    raise HTTPException(status_code=404, detail="Post Not Found")


@app.put("/posts/{post_id}")
def update_post(post_id: str, updatedpost: Post):
    for index, post in enumerate(posts):
        if post["id"] == post_id:
            posts[index].title = updatedpost.title
            posts[index].author = updatedpost.author
            posts[index].content = updatedpost.content
            return {"message": f"Post:{post_id} was updated successfully"}
    raise HTTPException(status_code=404, detail="Post Not Found")
