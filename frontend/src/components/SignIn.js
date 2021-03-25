// @ts-nocheck
/* eslint-disable jsx-a11y/alt-text */
import React, {useContext} from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import styles from "./index.module.css";
import { FacebookOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {UserContext} from './../App'
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const SignIn = () => {
  const history = useHistory();
  const {state,dispatch} = useContext(UserContext);

  const onFinish = (value) => {
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          NotificationManager.error("Error message", data.error);
        } else {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
           dispatch({type:"USER",payload:data.user})
          NotificationManager.success("Success message", data.message);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <NotificationContainer />
      <Row justify="center">
        <Col className={styles.image}>
          <img src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
        </Col>
        <Col>
          <Row justify="center">
            <Card className={styles.card_login}>
              <h2>HalaMadrid</h2>
              <Form name="basic" onFinish={onFinish}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input placeholder="Số điện thoại, tên người dùng hoặc email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className={styles.btn_submit}
                    htmlType="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
              <Row justify="center">
                <Col />
                <Col>HOẶC</Col>
                <Col />
              </Row>
              <Row justify="center" className={styles.face}>
                <FacebookOutlined style={{ padding: "4px 10px 0 0" }} />
                <p className={styles.face_text}>Đăng nhập bằng Facebook</p>
              </Row>
              <Row justify="center">
                <p style={{ cursor: "pointer" }}>Quên mật khẩu?</p>
              </Row>
            </Card>
          </Row>
          <Row justify="center">
            <Card className={styles.signup}>
              <p>
                <span>Bạn không có tài khoản? </span>
                <span style={{ color: "#0095f6", cursor: "pointer" }}>
                  <Link to="/signup">Đăng ký</Link>
                </span>
              </p>
            </Card>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SignIn;
