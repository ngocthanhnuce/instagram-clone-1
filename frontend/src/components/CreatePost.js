// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Card, Row } from "antd";
import styles from "./index.module.css";

const CretePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [, setLoading] = useState(false);
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          body,
          pic: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            NotificationManager.error("Error message", data.error);
          } else {
            NotificationManager.success(
              "Success message",
              "Created post Successfully"
            );
            setLoading(true);
            history.push("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [url, history, title, body]);

  const postDetails = () => {
    setLoading(true);
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
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <NotificationContainer />
      <Row justify="center" style={{ paddingTop: "50px" }}>
        <Card style={{ width: "500px" }}>
          <div
            style={{
              margin: "30px auto",
              maxWidth: "500px",
              textAlign: "center",
            }}
          >
            <h3>HalaMadrid</h3>
            <div class="form-group">
              <label for="exampleInputEmail1">Tiêu đề</label>
              <input
                type="text"
                className="form-control"
                placeholder="Chủ đề"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Nội dung</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Nội dung"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <div className="file-field input-field">
              <div className={styles.upload_btn_wrapper}>
                <span>Tải ảnh lên</span>
                <button className={styles.edit_avatar}>Upload Image</button>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>
            <button
              style={{ marginTop: "20px", width: "100%" }}
              className="btn btn-primary"
              onClick={() => postDetails()}
            >
              Đăng bài
            </button>
          </div>
        </Card>
      </Row>
    </>
  );
};

export default CretePost;
