// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  Avatar,
  Row,
  Image,
  Col,
  Input,
  Button,
  Spin,
  Comment,
  Tooltip,
} from "antd";
import styles from "./index.module.css";
import { UserContext } from "./../App";
import {
  HeartOutlined,
  CommentOutlined,
  SendOutlined,
  SmileOutlined,
  LikeOutlined,
  DislikeOutlined,
  EllipsisOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import Picker from "emoji-picker-react";
import moment from "moment";
import ModalConfirm from "./ModalConfirm";

const { Meta } = Card;

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [emoji, setEmoji] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postId, setPostId] = useState("");
  const [postName, setPostName] = useState("");
  console.log(data)

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showModal = (name) => {
    setIsModalVisible(true);
    setPostName(name)
  };

  useEffect(() => {
    fetch("/allpost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
        setLoading(false);
      });
  }, []);

  const likePost = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unlikePost = (id) => {
    fetch("/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const makeComment = (text, postId) => {
    fetch("/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
        setIsModalVisible(false)
      });
  };

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };
  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {React.createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <div className={styles.home}>
      {loading ? (
        <Row justify="center" style={{ paddingTop: "300px" }}>
          <Spin size="large" />
        </Row>
      ) : (
        <div>
          <Row
            justify="center"
            onClick={() => history.push("/createpost")}
            style={{ cursor: "pointer" }}
          >
            <Card style={{ width: 600, marginTop: "20px" }}>
              <Row>
                <Col span={8}>
                  <Meta
                    avatar={
                      <Avatar className={styles.home_avatar} src={state?.pic} />
                    }
                    title="Bạn nghĩ gì?.... "
                  />
                </Col>
                <Col span={8} offset={8}>
                  <Row justify="end"></Row>
                </Col>
              </Row>
            </Card>
          </Row>
          {data.map((item) => {
            return (
              <div key={item._id}>
                <Row justify="center">
                  <Card style={{ width: 600, marginTop: "20px" }}>
                    <Row>
                      <Col span={23}>
                        <Link
                          to={
                            item.postedBy?._id !== state._id
                              ? "/profile/" + item.postedBy?._id
                              : "/profile"
                          }
                        >
                          <Meta
                            avatar={
                              <Avatar
                                style={{ cursor: "pointer" }}
                                className={styles.home_avatar}
                                src={item?.postedBy?.pic}
                              />
                            }
                            title={item.postedBy?.name}
                          />
                        </Link>
                      </Col>
                      <Col>
                        <div onClick={() => setPostId(item._id)}>
                          <EllipsisOutlined
                            onClick={() => showModal(item.postedBy?.name)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </Col>
                      <ModalConfirm
                        isModalVisible={isModalVisible}
                        postId={postId}
                        handleCancel={handleCancel}
                        deletePost={deletePost}
                        userName={state?.name}
                        postName={postName}
                      />
                    </Row>

                    <Image
                      style={{ padding: "15px 0 15px 0" }}
                      src={item?.photo}
                    />
                    <Row>
                      <Col>
                        <HeartOutlined
                          style={{ fontSize: "25px", color: "red" }}
                        />
                      </Col>
                      <Col>
                        {item.likes.includes(state._id) ? (
                          <DislikeOutlined
                            style={{
                              fontSize: "25px",
                              paddingLeft: "15px",
                              cursor: "pointer",
                              color: "#1890ff"
                            }}
                            onClick={() => {
                              unlikePost(item._id);
                            }}
                          />
                        ) : (
                          <LikeOutlined
                            style={{
                              fontSize: "25px",
                              paddingLeft: "15px",
                              cursor: "pointer",
                              color: "#1890ff"
                            }}
                            onClick={() => {
                              likePost(item._id);
                            }}
                          />
                        )}
                      </Col>
                      <Col>
                        <CommentOutlined
                          style={{ fontSize: "25px", padding: "0 15px" }}
                        />
                      </Col>
                      <Col>
                        <SendOutlined style={{ fontSize: "25px" }} />
                      </Col>
                    </Row>
                    <Row className={styles.like}>
                      <p>{item.likes?.length} lượt thích</p>
                    </Row>
                    <Row>
                      <spam
                        style={{ fontWeight: "bold", paddingRight: "15px" }}
                      >
                        {item.postedBy?.name}
                      </spam>
                      <span>{item.title}</span>
                    </Row>
                    <Row>
                      {" "}
                      <sp>{item?.body}</sp>
                    </Row>
                    <Col>
                      {item.comments?.map((record) => {
                        return (
                          <>
                            <Row key={record._id}>
                              <Comment
                                key={record._id}
                                author={record.postedBy?.name}
                                avatar={record?.postedBy?.pic}
                                content={record?.text}
                                actions={actions}
                                datetime={
                                  <Tooltip
                                    title={moment().format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )}
                                  >
                                    <span>{moment().fromNow()}</span>
                                  </Tooltip>
                                }
                              />
                            </Row>
                          </>
                        );
                      })}
                    </Col>
                    <p>{item.createdAt.substring(11, 19)} giờ trước</p>
                    <p>#{item.createdAt.substring(0, 10)}</p>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(e.target[0].value, item._id);
                      }}
                    >
                      <Row justify="center" className={styles.comment}>
                        <Col span={20}>
                          <Input
                            type="text"
                            placeholder="Thêm bình luận..."
                            prefix={
                              <SmileOutlined onClick={() => setEmoji(!emoji)} />
                            }
                          />
                          {emoji ? (
                            <Picker onEmojiClick={onEmojiClick} />
                          ) : null}
                        </Col>
                        <Col>
                          <Button type="primary">Đăng</Button>
                        </Col>
                      </Row>
                    </form>
                  </Card>
                </Row>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
