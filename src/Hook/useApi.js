import axios from "axios";
import { useCallback, useState } from "react";
import API from "../API.json";

axios.defaults.baseURL = API.base;

export default function useApi({ config }) {
  const [res, setRes] = useState({ data: null, error: "", loading: false });

  const callApi = useCallback(() => {
    console.info("request =========", config);
    setRes((prev) => ({ ...prev, loading: true }));
    axios(JSON.parse(config))
      .then((res) => {
        console.info("response =========", config, res);
        setRes({ data: res, error: "", loading: false });
      })
      .catch((err) => {
        setRes({ data: null, error: err.message, loading: false });
      });
  }, [config]);

  return [res, callApi];
}
