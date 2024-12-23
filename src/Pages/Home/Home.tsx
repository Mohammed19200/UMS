import { useContext, useEffect, useState } from "react";
import { usersProcesscontext } from "../../Context/AllUsers";
import "./Home.css";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import { BallTriangle } from "react-loader-spinner";

interface Post {
  id: number;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

interface ToDo {
  id: number;
  todo: string;
  completed: boolean;
}

export default function Home() {
  const [content, setContent] = useState<"posts" | "todolists">("posts");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [toDoList, setToDoList] = useState<ToDo[]>([]);

  const userId = Number(localStorage.getItem("userId"));
  const userName = localStorage.getItem("userName");
  const userImage = localStorage.getItem("userImage");

  const { getUserPosts, getUserToDoList } = useContext(usersProcesscontext) as {
    getUserPosts: (id: number) => Promise<any>;
    getUserToDoList: (id: number) => Promise<any>;
  };

  const getPosts = async (userId: number) => {
    try {
      const { data } = await getUserPosts(userId);
      setPosts(data?.posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTodoList = async (userId: number) => {
    try {
      const { data } = await getUserToDoList(userId);
      setToDoList(data?.todos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts(userId);
    getTodoList(userId);
  }, [userId]);

  return (
    <div>
      {loading ? (
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperClass="d-flex justify-content-center"
          visible={true}
        />
      ) : (
        <>
          <div className="col-12 big-Div-Buttons-Content">
            <button
              className="button-Style-Content"
              onClick={() => setContent("posts")}
            >
              Posts
            </button>
            <button
              className="button-Style-Content"
              onClick={() => setContent("todolists")}
            >
              To Do List
            </button>
          </div>

          {content === "posts" ? (
            <div className="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-8 m-auto bigest-Div-Posts">
              <h1 className="h4 text-center">Posts</h1>
              {posts.map((post) => (
                <div key={post.id} className="post-Description">
                  <div className="div-Post-User-Image-Name">
                    {userImage && (
                      <img
                        className="img-Post"
                        src={userImage}
                        alt={userName || "User"}
                      />
                    )}
                    <h5>{userName}</h5>
                  </div>

                  <div className="posts-Body">
                    <p>{post.body}</p>
                    {post.tags.map((tag, index) => (
                      <small key={index} className="pe-1">
                        @{tag}
                      </small>
                    ))}
                  </div>

                  <div className="user-Active col-12">
                    <h6
                      style={{ fontSize: "0.9rem", color: "rgb(0 0 0 / 68%)" }}
                    >
                      <AiFillLike size={20} /> {post.reactions.likes}
                    </h6>
                    <h6
                      style={{ fontSize: "0.9rem", color: "rgb(0 0 0 / 68%)" }}
                    >
                      <AiFillDislike size={20} /> {post.reactions.dislikes}
                    </h6>
                    <h6
                      style={{ fontSize: "0.9rem", color: "rgb(0 0 0 / 68%)" }}
                    >
                      <FaUsers size={20} /> {post.views}
                    </h6>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="toDoList col-11 col-sm-11 col-md-12 col-lg-11 m-auto">
              <h1 className="h4 text-center col-12">To Do List</h1>
              {toDoList.map((list) => (
                <Card
                  key={list.id}
                  className="col-12 col-sm-12 col-md-5 col-lg-3"
                >
                  <Card.Body>
                    <Card.Text className="text-center">
                      <span
                        className={
                          list.completed
                            ? "bollean-ToDoListe-complated"
                            : "bollean-ToDoListe-notcomplated"
                        }
                      >
                        {list.completed ? "Completed" : "Not Completed"}
                      </span>
                    </Card.Text>
                    <Card.Title className="fs-6">{list.todo}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
