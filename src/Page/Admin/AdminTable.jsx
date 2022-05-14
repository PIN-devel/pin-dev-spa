import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import AdminDeleteBtn from "./AdminDeleteBtn";
// import axios from "axios";
// import API from "../../API.json";

export default function AdminTable({ docs, setTotalCnt, setDocList }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">제목</TableCell>
            <TableCell align="right">갱신 시간</TableCell>
            <TableCell align="right">생성 시간</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docs.map((doc) => (
            <TableRow
              key={doc.boardId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {doc.boardId}
              </TableCell>
              <TableCell align="right">{doc.title}</TableCell>
              <TableCell align="right">{doc.updatedAt}</TableCell>
              <TableCell align="right">{doc.createdAt}</TableCell>
              <TableCell align="right">
                <IconButton color="success">
                  <EditIcon />
                </IconButton>
                <AdminDeleteBtn id={doc.boardId} setTotalCnt={setTotalCnt} setDocList={setDocList}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
