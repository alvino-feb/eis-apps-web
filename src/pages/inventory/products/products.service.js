import api from "../../../api/axios";

// *********************** PRODUCTS *********************** //
export const getProductList = (
  query
) =>
  api.get(
    `/api/inventory/product`,{params: query}
);

export const createProduct = (
  payload
) =>
  api.post(
    "/api/inventory/product",
    payload
);

export const updateProduct = (businessId,businessMemberId,id,payload
) =>
  api.put(
    "/api/inventory/product",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deleteProduct = ( 
  businessId,
  businessMemberId,
  id
) =>
  api.delete(
    "/api/inventory/product",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);