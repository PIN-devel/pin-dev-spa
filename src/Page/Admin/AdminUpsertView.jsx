import { Box, Container, IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../../Hook/useApi";

export default function AdminUpsertView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useState({ title: "", content: "" });
  const [boardId, setBoardId] = useState(0);
  const [{ data, error, loading }, callApi] = useApi({
    config: JSON.stringify({
      method: "post",
      headers: { "Content-Type": "application/json" },
      data: params,
    }),
  });
  const [
    { data: detailData, error: detailError, loading: detailLoading },
    callDetailApi,
  ] = useApi({
    config: JSON.stringify({
      method: "get",
      url: `/${boardId}`,
    }),
  });

  const handleChange = (e) => {
    let tmp;
    if (e.target.tagName.toString() === "INPUT") {
      tmp = { title: e.target.value };
    } else {
      tmp = { content: e.target.value };
    }
    setParams((prev) => {
      return { ...prev, ...tmp };
    });
  };
  const goBack = () => {
    navigate("/admin");
  };
  const send = () => {
    callApi();
    navigate("/admin");
  };

  useEffect(() => {
    if (location.state) {
      setBoardId(location.state.id);
    }
  }, [location.state]);

  useEffect(() => {
    if (boardId !== 0) {
      callDetailApi();
    }
  }, [boardId, callDetailApi]);

  useEffect(() => {
    if (detailData) {
      const doc = detailData.data;
      setParams({
        boardId: doc.boardId,
        title: doc.title,
        content: doc.content,
      });
    }
  }, [detailData]);

  return (
    <Container maxWidth="sm">
      <IconButton color="secondary" onClick={goBack}>
        <ArrowBackIcon />
      </IconButton>
      <IconButton color="primary" onClick={send}>
        <SaveIcon />
      </IconButton>
      <Box component="form">
        <div>
          <TextField
            fullWidth
            id="standard-basic"
            label="제목"
            variant="standard"
            value={params.title}
            onChange={handleChange}
            margin="dense"
          />
        </div>
        <div>
          <TextField
            fullWidth
            multiline
            id="outlined-multiline-static"
            placeholder="내용"
            rows={30}
            value={params.content}
            onChange={handleChange}
          />
        </div>
      </Box>
    </Container>
  );
}
