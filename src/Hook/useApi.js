import axios from "axios";
import { useCallback, useState } from "react";
import API from "../API.json";

axios.defaults.baseURL = API.base;

export default function useApi({ method, url, config }) {
  const [res, setRes] = useState({ data: null, error: "", loading: false });

  const callApi = useCallback(() => {
    console.info("request =========", method, url, config);
    setRes((prev) => ({ ...prev, loading: true }));
    axios[method](url, config)
      .then((res) => {
        console.info("response =========", method, url, res);
        setRes({ data: res, error: "", loading: false });
      })
      .catch((err) => {
        setRes({ data: null, error: err.message, loading: false });
      });
  }, [method, url, config]);

  return [res, callApi];
}
