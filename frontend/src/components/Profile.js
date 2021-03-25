// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import { Avatar, Button, Col, Image, Row, Tabs, Upload, Spin } from "antd";
import styles from "./index.module.css";
import {
  CloudDownloadOutlined,
  ContactsOutlined,
  SettingOutlined,
  SolutionOutlined,
  TableOutlined,
  VideoCameraAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { UserContext } from "../App";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const { TabPane } = Tabs;

const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);

  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
  }, []);
  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "dvizwdhso");
      fetch("https://api.cloudinary.com/v1_1/dvizwdhso/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [dispatch, image, state]);

  let id = null;
  const updatePhoto = (file) => {
    setImage(file);
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      NotificationManager.success("Thay đổi avatar thành công", "Success message");
    }, 3000);
  };

  return (
    <>
      <Row justify="center" className={styles.profile}>
        <Col className={styles.avatar_image}>
          <Row>
            <Avatar
              style={{ width: "130px", height: "130px" }}
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={<Image src={state ? state.pic : <Spin />} />}
            />
          </Row>
          <Row>
            <div className={styles.upload_btn_wrapper}>
              <button className={styles.edit_avatar}>Thay ảnh đại diện</button>
              <input
                type="file"
                onChange={(e) => updatePhoto(e.target.files[0])}
              />
            </div>
          </Row>
          <NotificationContainer />
        </Col>
        <Col>
          <Row className={styles.setting}>
            <Col>
              <p className={styles.username}>
                {state ? state.name : <Spin size="large" />}
              </p>
            </Col>
            <Col className={styles.edit}>
              <Button className={styles.btn_edit}>
                Chỉnh sửa trang cá nhân
              </Button>
            </Col>
            <Col style={{ marginTop: "8px" }}>
              <SettingOutlined style={{ fontSize: "25px" }} />
            </Col>
          </Row>
          <Row>
            <Col>
              <p className={styles.follow}>{mypics.length} bài viết</p>
            </Col>
            <Col className={styles.follower}>
              <p className={styles.follow}>
                {state ? state.followers.length : "0"} người theo dõi
              </p>
            </Col>
            <Col>
              <p className={styles.follow}>
                Đang theo dõi {state ? state.following.length : "0"} người dùng
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
                  {mypics.map((item) => {
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
                  icon={<VideoCameraAddOutlined style={{ fontSize: "30px" }} />}
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
                <CloudDownloadOutlined />
                Đã lưu
              </span>
            }
            key="3"
          >
            Đã lưu
          </TabPane>
          <TabPane
            tab={
              <span style={{ marginRight: "60px" }}>
                <SolutionOutlined />
                Đã lưu
              </span>
            }
            key="4"
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
                Khi mọi người gắn thẻ bạn trong ảnh, ảnh sẽ xuất hiện tại đây.
              </p>
            </div>
          </TabPane>
        </Tabs>
      </Row>
    </>
  );
};

export default Profile;
