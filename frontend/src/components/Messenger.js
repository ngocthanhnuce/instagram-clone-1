// @ts-nocheck
import React, {useState} from "react";
import {Button} from "antd"

function Messenger() {
  const [image, setImage] = useState("")
  const onSubmit = () => {
    console.log(image)
  }
  return (
    <div>
      <h3>Messenger</h3>
      <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <Button onClick={() => onSubmit()} >Submit</Button>
    </div>
  );
}

export default Messenger;
