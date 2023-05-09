import { Box, Button, ButtonBase } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import getURL from "../utils/getURL";
export default function Test() {
  const [file, setFile] = useState(null);
  function handleUpload() {
    console.log(file);
    axios
      .request({
        method: "POST",
        url: getURL("incidents/test"),
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: {
          picture: file,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <Box
        component="img"
        src={file && URL.createObjectURL(file)}
        sx={{ width: 200, height: 200 }}
        alt="The house from the offer."
      />
      <ButtonBase variant="contained" component="label">
        <input
          type="file"
          accept="image/png,image/jpeg"
          hidden
          onChange={(e) => {
            const file = e.target.files[0];

            const blob = new Blob([file], { type: file.type });
            setFile(blob);
          }}
        />
        Upload File
      </ButtonBase>
      <Button variant="contained" component="label" onClick={handleUpload}>
        Upload File
      </Button>
    </div>
  );
}
