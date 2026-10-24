import api from "../api/axios.js";

export const getUserMenu = async (businessId,userId) => {
  return api.get(`/api/app-setting/user-menu`,{params:{businessId,userId}});
};
