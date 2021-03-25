// @ts-nocheck
import React from "react";
import { Col, Row } from "antd";
import styles from "./index.module.css";
import { DownOutlined } from "@ant-design/icons";

const Footer = () => {
  return (
    <div style={{ textAlign: "center", paddingBottom: "30px"}}>
      <Row justify="center">
        <Col>Giới thiệu</Col>
        <Col className={styles.footer}>Blog</Col>
        <Col>Việc làm</Col>
        <Col className={styles.footer}>Trợ giúp</Col>
        <Col>API</Col>
        <Col className={styles.footer}>Quyền riêng tư</Col>
        <Col>Điều khoản</Col>
        <Col className={styles.footer}>Tài khoản liên quan nhất</Col>
        <Col>Hashtag</Col>
        <Col>Hashtag</Col>
        <Col className={styles.footer}>Vị trí</Col>
      </Row>
      <Row justify="center" style={{paddingTop: "15px"}}>
        <Col style={{paddingRight: "20px"}}>Tiếng Việt <DownOutlined /></Col>
        <Col>@ 2021 HalaMadrid from ngoc thanh</Col>
      </Row>
    </div>
  );
};

export default Footer;
