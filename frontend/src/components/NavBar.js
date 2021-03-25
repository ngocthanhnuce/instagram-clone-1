// @ts-nocheck
import React, { useContext, useState, useRef, useEffect } from "react";
import { Col, Input, Row, Dropdown, Menu } from "antd";
import styles from "./navbar.module.css";
import {
  CompassOutlined,
  HeartOutlined,
  HomeOutlined,
  MessageOutlined,
  UserOutlined,
  SettingOutlined,
  RetweetOutlined,
  ContactsOutlined,
  PoweroffOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const { Search } = Input;

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const searchModal = useRef(null);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((results) => {
        setUserDetails(results.user);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">
          <UserOutlined />
          Trang cá nhân
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <ContactsOutlined />
        Đã lưu
      </Menu.Item>
      <Menu.Item key="3">
        <SettingOutlined />
        Cài đặt
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/signin">
          <RetweetOutlined />
          Login
        </Link>
      </Menu.Item>
      <Menu.Item
        key="5"
        style={{ borderTop: "1px solid #e5e5e5" }}
        onClick={() => {
          localStorage.clear();
          dispatch({ type: "CLEAR" });
          history.push("/signin");
        }}
      >
        <PoweroffOutlined /> Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles.nav_instagram}>
      <Row justify="center" style={{ marginTop: "-3px" }}>
        <Col span={8} className={styles.instagram}>
          <Link to={state ? "/" : "/signin"}>
            <Row justify="center">
              <div style={{ paddingTop: "0px" }}>
                {" "}
                <HomeOutlined
                  style={{
                    fontSize: "30px",
                    color: "black",
                    cursor: "pointer",
                  }}
                />
              </div>
              <h3>HalaMadrid</h3>
            </Row>
          </Link>
        </Col>
        <Col span={4} className={styles.instagram}>
          <Search placeholder="Tìm kiếm" onSearch={fetchUsers} enterButton />
        </Col>

        <Col span={8} className={styles.icon_instagram}>
          <Row justify="center">
            <Row style={{ paddingTop: "8px" }}>
              <div style={{ marginTop: "-2px" }}>
                <Link to="/messenger">
                  <MessageOutlined
                    style={{
                      fontSize: "23px",
                      paddingRight: "20px",
                      cursor: "pointer",
                      color: "black",
                    }}
                  />
                </Link>
              </div>
              <CompassOutlined
                style={{ fontSize: "23px", paddingRight: "20px" }}
              />
              <HeartOutlined
                style={{ fontSize: "23px", paddingRight: "20px" }}
              />
              <div style={{ marginTop: "-3px" }}>
                <Link to="/myfollowingpost">
                  <UserAddOutlined
                    style={{
                      fontSize: "23px",
                      paddingRight: "20px",
                      cursor: "pointer",
                      color: "black",
                    }}
                  />
                </Link>
              </div>
            </Row>
            <div style={{ marginTop: "3px" }}>
              <Dropdown.Button
                className="user"
                overlay={menu}
                icon={<UserOutlined style={{ fontSize: "22px" }} />}
              />
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NavBar;
