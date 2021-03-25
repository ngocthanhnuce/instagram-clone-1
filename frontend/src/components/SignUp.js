/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import styles from "./index.module.css";
import { FacebookOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const SignUp = () => {
  const history = useHistory();
  const onFinish = (value) => {
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then(data => {
        if (data.error) {
          NotificationManager.error("Error message", data.error);
        } else {
          NotificationManager.success("Success message", data.message);
          history.push("/signin");
        }
      }).catch(err=>{
        console.log(err)
    })
  };
  return (
    <>
      <Row justify="center">
        <Col className={styles.image}>
          <img src="https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg" />
        </Col>
        <Col>
          <Row justify="center">
            <Card className={styles.card_login}>
              <h2>Instagram</h2>
              <h4>Đăng ký để xem ảnh và video từ bạn bè.</h4>
              <Button className={styles.btn_submit_login_face} type="primary">
                <FacebookOutlined />
                Đăng nhập bằng Facebook
              </Button>
              <Row justify="center" style={{ paddingBottom: "15px" }}>
                <Col />
                <Col>HOẶC</Col>
                <Col />
              </Row>
              <Form name="basic" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your name",
                    },
                  ]}
                >
                  <Input placeholder="Nhập tên người dùng" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input placeholder="Nhập email" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input placeholder="Mật khẩu" />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className={styles.btn_submit}
                    htmlType="submit"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>
              </Form>
              <Row justify="center" className={styles.policy}>
                <p>
                  Bằng cách đăng ký, bạn đồng ý với Điề khoản, Chính sách dữ
                  liệu và Chính sách cookie của chúng tôi.
                </p>
              </Row>
            </Card>
          </Row>
          <Row justify="center">
            <Card className={styles.signup}>
              <p>
                <span>Bạn có tài khoản? </span>
                <span style={{ color: "#0095f6" }}>
                  <Link to="/signin">Đăng nhập</Link>
                </span>
              </p>
            </Card>
          </Row>
        </Col>
        <NotificationContainer />
      </Row>
    </>
  );
};

export default SignUp;



