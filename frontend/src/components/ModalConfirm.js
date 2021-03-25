import React from "react";
import { Row, Modal } from "antd";
import styles from "./index.module.css";

function ModalConfirm(props) {
  const {
    isModalVisible,
    handleCancel,
    postId,
    deletePost,
    userName,
    postName,
  } = props;
  const renderDelete = () => {
    if (userName === postName) {
      return (
        <Modal
          style={{ textAlign: "center" }}
          footer={null}
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <div>
            <Row justify="center" className={styles.confirm}>
              Báo cáo
            </Row>
            <Row justify="center" className={styles.confirm}>
              Bỏ theo dõi
            </Row>
            <Row justify="center" className={styles.confirm}>
              Chia sẻ
            </Row>
						<Row justify="center" className={styles.confirm}>
              Sao chép liên kết
            </Row>
            <Row
              justify="center"
              className={styles.confirm}
              onClick={() => deletePost(postId)}
            >
              Xóa bài viết
            </Row>
            <Row justify="center" className={styles.cancel}>
              Hủy
            </Row>
          </div>
        </Modal>
      );
    } else {
      return (
        <Modal
          style={{ textAlign: "center" }}
          footer={null}
          visible={isModalVisible}
          onCancel={handleCancel}
        >
          <div>
            <Row justify="center" className={styles.confirm}>
              Báo cáo
            </Row>
            <Row justify="center" className={styles.confirm}>
              Bỏ theo dõi
            </Row>
            <Row justify="center" className={styles.confirm}>
              Chia sẻ
            </Row>
						<Row justify="center" className={styles.confirm}>
              Sao chép liên kết
            </Row>
            <Row justify="center" className={styles.cancel}>
              Hủy
            </Row>
          </div>
        </Modal>
      );
    }
  };

  return <>{renderDelete()}</>;
}

export default ModalConfirm;
