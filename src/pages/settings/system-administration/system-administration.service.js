import api from "../../../api/axios";

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
  id
) =>
  api.delete(
    `/api/app-setting/business-member/${id}`
  );