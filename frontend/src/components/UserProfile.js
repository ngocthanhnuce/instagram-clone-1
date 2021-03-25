// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { Avatar, Button, Col, Image, Row, Tabs, Upload, Spin } from "antd";
import styles from "./index.module.css";
import {
  ContactsOutlined,
  EllipsisOutlined,
  SolutionOutlined,
  TableOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";
import { useParams } from "react-router-dom";

const { TabPane } = Tabs;

const UserProfile = () => {
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();
  const [userProfile, setProfile] = useState(null);
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userid) : true
  );

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
      });
  }, [userid]);

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };
  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));

        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (item) => item !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {userProfile ? (
        <>
          <Row justify="center" className={styles.profile}>
            <Col className={styles.avatar_image}>
              <Row>
                <Avatar
                  style={{ width: "130px", height: "130px" }}
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src={<Image src={userProfile?.user?.pic} />}
                />
              </Row>
              <Row>
                <Button className={styles.edit_avatar} type="primary">
                  Thay avatar
                </Button>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col>
                  <p className={styles.username}>
                    {userProfile ? (
                      userProfile?.user?.name
                    ) : (
                      <Spin size="large" />
                    )}
                  </p>
                </Col>
                {showFollow ? (
                  <Col className={styles.edit}>
                    <Button
                      type="primary"
                      className={styles.btn_edit}
                      onClick={() => followUser()}
                    >
                      Theo dõi
                    </Button>
                  </Col>
                ) : (
                  <>
                    <Col className={styles.edit}>
                      <Button type="primary" className={styles.btn_edit}>
                        Nhắn tin
                      </Button>
                    </Col>
                    <Col className={styles.edit}>
                      <Button
                        type="primary"
                        className={styles.btn_edit}
                        onClick={() => unfollowUser()}
                      >
                        Bỏ theo dõi
                      </Button>
                    </Col>
                  </>
                )}
                <Col style={{ marginTop: "8px" }}>
                  <EllipsisOutlined
                    style={{ cursor: "pointer", fontSize: "25px" }}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className={styles.follow}>
                    {userProfile.posts.length} bài viết
                  </p>
                </Col>
                <Col className={styles.follower}>
                  <p className={styles.follow}>
                    {userProfile.user.followers.length} người theo dõi
                  </p>
                </Col>
                <Col>
                  <p className={styles.follow}>
                    Đang theo dõi {userProfile.user.following.length} người dùng
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center" className={styles.post}>
            <Tabs defaultActiveKey="1" centered>
              <TabPane
                tab={
                  <span style={{ marginRight: "60px" }}>
                    <TableOutlined />
                    Bài viết
                  </span>
                }
                key="1"
              >
                <div style={{ textAlign: "center", paddingBottom: "50px" }}>
                  <Row>
                    <Col>
                      {userProfile.posts.map((item) => {
                        return (
                          <Image
                            width={200}
                            height={200}
                            style={{ padding: "10px" }}
                            key={item._id}
                            src={item.photo}
                            alt={item.title}
                          />
                        );
                      })}
                    </Col>
                  </Row>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span style={{ marginRight: "60px" }}>
                    <VideoCameraOutlined />
                    IGTV
                  </span>
                }
                key="2"
              >
                <div style={{ textAlign: "center" }}>
                  <div className={styles.video}>
                    <Avatar
                      size={64}
                      icon={
                        <VideoCameraAddOutlined style={{ fontSize: "30px" }} />
                      }
                    />
                  </div>
                  <p>Tải video lên</p>
                  <p>Video có thời lượng từ 1 đến 60 phút</p>
                  <Upload>
                    <Button className={styles.btn_edit} type="primary">
                      Tải lên
                    </Button>
                  </Upload>
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span style={{ marginRight: "60px" }}>
                    <SolutionOutlined />
                    Đã lưu
                  </span>
                }
                key="3"
              >
                <div style={{ textAlign: "center" }}>
                  <div className={styles.video}>
                    <Avatar
                      size={64}
                      icon={<ContactsOutlined style={{ fontSize: "30px" }} />}
                    />
                  </div>
                  <p>Ảnh có mặt bạn</p>
                  <p>
                    Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại
                    đây.
                  </p>
                </div>
              </TabPane>
            </Tabs>
          </Row>
        </>
      ) : (
        <Row justify="center" style={{ paddingTop: "300px" }}>
          <Spin size="large" />
        </Row>
      )}
    </>
  );
};

export default UserProfile;
