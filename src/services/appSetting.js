import api from "../api/axios.js";

export const getUserMenu = async (userId,businessId,businessMemberId) => {
  // return api.get(`/app-setting/v1/user-management/user-menu`);
  return api.get(`/api/app-setting/user-menu/${userId}/${businessId}/${businessMemberId}`);

  // const res = await axios.get(`/api/app-setting/v1/user-management/user-menu?username=${username}`);
  // const res = api.get(`/app-setting/v1/user-management/user-menu?username=${username}`);
  // return res.data;

};