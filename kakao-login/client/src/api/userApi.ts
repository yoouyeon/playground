import apiClient from ".";

const userApi = {
  getUser: () => apiClient.get("/auth/user"),
  logout: () => apiClient.post("/auth/logout"),
};

export default userApi;
