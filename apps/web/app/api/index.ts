import { axiosInstance } from "app/axios/axios";

export async function checkLink(link: string) {
  const res = await axiosInstance.post("validate-link", {
    params: { link: JSON.stringify(link) },
    paramsSerializer: { encode: encodeURIComponent },
  });
  return res.data;
}

export async function createRoom() {
  const res = await axiosInstance.post("/create");
  return res.data;
}
