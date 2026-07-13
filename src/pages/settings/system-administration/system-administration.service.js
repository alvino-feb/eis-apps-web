import api from "../../../api/axios";

// *********************** BUSINESS ***********************//
export const getBusinessInfo = (
  businessId
) =>
  api.get(
    `/api/app-setting/business/${businessId}`
);

export const updateBusinessInfo = (
  businessId,
  payload
) =>
  api.put(
    `/api/app-setting/business/${businessId}`,
    payload
);

// *********************** BUSINESS MEMBER ***********************//
export const getBusinessMembers = (
  businessId
) =>
  api.get(
    `/api/app-setting/business-member/${businessId}`
);

export const createBusinessMember = (
  payload
) =>
  api.post(
    "/api/app-setting/business-member",
    payload
);

export const updateBusinessMember = (
  id,
  payload
) =>
  api.put(
    `/api/app-setting/business-member/${id}`,
    payload
);

export const deleteBusinessMember = (
  businessId,
  businessMemberId
) =>
  api.delete(
    `/api/app-setting/business-member/${businessId}/${businessMemberId}`
);

// *********************** USER ***********************//
export const getUsers = (businessId) =>
  api.get(
    `/api/app-setting/user/${businessId}`
);

export const getUser = (id) =>
  api.get(
    `/api/app-setting/user/${id}`
);

export const getUserByMemberAndRole = (businessId,businessMemberId,roleId) =>
  api.get(
    `/api/app-setting/user/${businessId}/member/${businessMemberId}/role/${roleId}`
);

export const createUser = (data) =>
  api.post(
    "/api/app-setting/user/menu",
    data
);

export const updateUser = (
  data
) =>
  api.put(
    `/api/app-setting/user`,
    data
);

export const deleteUser = (
  businessId,
  businessMemberId,
  id) =>
  api.delete(
    `/api/app-setting/user/menu/${businessId}/${businessMemberId}/${id}`
);

// *********************** USER BUSINESS MEMBER ***********************//
export const getUserBusinessMembers = (
  userId
) =>
  api.get(
    `/api/app-setting/user-business-member/${userId}`
);

export const getUserBusinessMembersByUser = (
  businessId,userId
) =>
  api.get(
    `/api/app-setting/user-business-member/by-user/${businessId}/${userId}`
);

export const assignMember = (
  data
) =>
  api.post(
    "/api/app-setting/user-business-member",
    data
);

export const deleteUserMember = (
  id
) =>
  api.delete(
    `/api/app-setting/user-business-member/${id}`
);

// *********************** USER MENU ***********************//
export const getUserMenus = (
  userId,
  businessMemberId
) =>
  api.get(
    `/api/app-setting/user-menu/${userId}/${businessMemberId}`
);

export const getUserMenuList = (
  businessId,
  businessMemberId,
  userId
) =>
  api.get(
    `/api/app-setting/user-menu/list/${businessId}/${businessMemberId}/${userId}`
);

export const saveUserMenus = (
  data
) =>
  api.put(
    "/api/app-setting/user-menu",
    data
);

// *********************** ROLE ***********************//
export const getRole = (
  businessId
) =>
  api.get(
    `/api/app-setting/role/${businessId}`
);

export const getRoleWithMenu = (
  businessId,
  id
) =>
  api.get(
    `/api/app-setting/role/menu/${businessId}/${id}`
);

export const getRolebyMember = (
  businessId,
  businessMemberId
) =>
  api.get(
    `/api/app-setting/role/by-member/${businessId}/${businessMemberId}`
);

export const updateRole = (
  payload
) =>
  api.put(
    `/api/app-setting/role/menu`,payload
);

export const createRole = (payload) =>  
  api.post(
    `/api/app-setting/role/menu`,payload
);

export const deleteRole = (businessId,id) =>  
  api.delete(
    `/api/app-setting/role/menu/${businessId}/${id}`
);

// *********************** MENU ***********************//
export const getMenu = () =>
  api.get(
    `/api/app-setting/menu?limit=200`
);

