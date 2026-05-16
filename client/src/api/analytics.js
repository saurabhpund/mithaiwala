import API from "./axios";

export const getDashboardOverview = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/analytics/overview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};