import React, { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import AdminTable from "./AdminTable";
import useApi from "../../Hook/useApi";

export default function AdminView() {
  const [docList, setDocList] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [{ data, error, loading }, callApi] = useApi({
    method: "get",
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
        color="secondary"
        sx={{ p: 1, m: 2 }}
      />
      <AdminTable docs={docList} setTotalCnt={setTotalCnt} setDocList={setDocList} />
      {loading && <div>loading...</div>}
      {error}
    </div>
  );
}
