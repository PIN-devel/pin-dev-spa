import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import AdminDeleteBtn from "./AdminDeleteBtn";
import { useNavigate } from "react-router-dom";

// import axios from "axios";
// import API from "../../API.json";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: "1.2rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.2rem",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // "&:nth-of-type(even)": {
  //   backgroundColor: theme.palette.secondary.main,
  // },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminTable({ docs, setTotalCnt, setDocList }) {
  const navigate = useNavigate();
  const goEdit = (id) => {
    navigate("/admin/upsert", { state: { id } });
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">제목</StyledTableCell>
            <StyledTableCell align="right">갱신 시간</StyledTableCell>
            <StyledTableCell align="right">생성 시간</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docs.map((doc) => (
            <StyledTableRow
              key={doc.boardId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {doc.boardId}
              </StyledTableCell>
              <StyledTableCell align="right">{doc.title}</StyledTableCell>
              <StyledTableCell align="right">{doc.updatedAt}</StyledTableCell>
              <StyledTableCell align="right">{doc.createdAt}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton color="success" onClick={() => goEdit(doc.boardId)}>
                  <EditIcon />
                </IconButton>
                <AdminDeleteBtn
                  id={doc.boardId}
                  setTotalCnt={setTotalCnt}
                  setDocList={setDocList}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
