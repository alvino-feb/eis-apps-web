import api from "../api/axios.js";

export const getUserMenu = async (userId,businessId,businessMemberId) => {
  return api.get(`/api/app-setting/user-menu/${userId}/${businessId}/${businessMemberId}`);
};
