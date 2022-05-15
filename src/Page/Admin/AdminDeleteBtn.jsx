import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import React, { useEffect } from "react";
import useApi from "../../Hook/useApi";

export default function AdminDeleteBtn({ id, setTotalCnt, setDocList }) {
  const [{ data, error, loading }, callDeleteApi] = useApi({
    config: JSON.stringify({ method: "delete", url: `/${id}` }),
  });
  const [
    { data: listData, error: listError, loading: listLoading },
    callGetListApi,
  ] = useApi({ config: JSON.stringify({ method: "get" }) });

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      callDeleteApi();
    }
  };

  useEffect(() => {
    if (data) {
      callGetListApi();
    }
  }, [data, callGetListApi]);

  useEffect(() => {
    if (listData) {
      console.log(listData);
      setTotalCnt(listData.data.totalCnt);
      setDocList(JSON.parse(listData.data.data));
    }
  }, [listData, setTotalCnt, setDocList]);

  return (
    <IconButton color="error" onClick={handleDelete}>
      <DeleteForeverIcon />
    </IconButton>
  );
}
