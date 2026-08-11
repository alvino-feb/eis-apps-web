import api from "../../../api/axios";

// *********************** WAREHOUSE *********************** //
export const getWarehouseList = (
  query
) =>
  api.get(
    `/api/inventory/warehouse`,{params: query}
);

export const createWarehouse = (
  payload
) =>
  api.post(
    "/api/inventory/warehouse",
    payload
);

export const updateWarehouse = (businessId,businessMemberId,id,payload
) =>
  api.put(
    "/api/inventory/warehouse",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deleteWarehouse = ( 
  businessId,
  businessMemberId,
  id
) =>
  api.delete(
    "/api/inventory/warehouse",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);