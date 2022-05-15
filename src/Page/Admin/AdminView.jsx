import React, { useEffect, useState } from "react";
import { Chip, IconButton } from "@mui/material";
import AdminTable from "./AdminTable";
import useApi from "../../Hook/useApi";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";

export default function AdminView() {
  const [docList, setDocList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [{ data, error, loading }, callApi] = useApi({
    config: JSON.stringify({ method: "get" }),
  });

  useEffect(() => {
    callApi();
  }, [callApi]);

  useEffect(() => {
    if (data) {
      setTotalCnt(data.data.totalCnt);
      setDocList(JSON.parse(data.data.data));
    }
  }, [data]);

  return (
    <div>
      <Chip
        label={`총 데이터 수 : ${totalCnt}`}
        color="primary"
        sx={{ p: 1, m: 2, fontSize: "1.2rem" }}
      />
      <Link to="/admin/upsert">
        <IconButton color="success" size="medium">
          <AddCircleOutlineIcon fontSize="large" />
        </IconButton>
      </Link>
      <AdminTable
        docs={docList}
        setTotalCnt={setTotalCnt}
        setDocList={setDocList}
      />
      {loading && <div>loading...</div>}
      {error}
    </div>
  );
}
