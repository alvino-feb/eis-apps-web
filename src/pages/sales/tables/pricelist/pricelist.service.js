import api from "../../../../api/axios";

// *********************** PRICELIST *********************** //
export const getPricelistList = (
  query
) =>
  api.get(
    `/api/sales/pricelist`,{params: query}
);

export const createPricelist = (
  payload
) =>
  api.post(
    "/api/sales/pricelist",
    payload
);

export const updatePricelist = (businessId,businessMemberId,id,payload
) =>
  api.put(
    "/api/sales/pricelist",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

export const deletePricelist = ( 
  businessId,
  businessMemberId,
  id
) =>
  api.delete(
    "/api/sales/pricelist",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

// *********************** PRODUCT PRICE *********************** //
export const getProductPriceList = (
  query
) =>
  api.get(
    `/api/sales/pricelist/product`,{params: query}
);

export const createProductPrice = (
  payload
) =>
  api.post(
    "/api/sales/pricelist/product",
    payload
);

export const updateProductPrice = (
  businessId,
  businessMemberId,
  pricelistId,
  productId,
  id,
  payload
) =>
  api.put(
    "/api/sales/pricelist/product",
    payload,
    {
        params: {
            businessId,
            businessMemberId,
            pricelistId,
            productId,
            id,
        },
    }
);

export const deleteProductPrice = ( 
  businessId,
  businessMemberId,
  id
) =>
  api.delete(
    "/api/sales/pricelist/product",
    {
        params: {
            businessId,
            businessMemberId,
            id,
        },
    }
);

// *********************** INVENTORY / PRODUCT PRICE OPTIONS *********************** //
export const getProductPriceOptions = (
  query
) =>
  api.get(
    `/api/sales/pricelist/product-options`,{params: query}
);
