const API_URL = process.env.API_URL ?? "http://localhost:3000";

type OrderStatus =
  | "ORDER_PLACED"
  | "AWAITING_PAYMENT"
  | "DELIVERED_TO_COURIER"
  | "CONFIRMED"
  | "COMPLETED"
  | "DELIVERED"
  | "CANCELLED";

type OrderProduct = {
  productId: number;
  productName: string;
  quantity: number;
  price: string;
  subTotal: string;
};

type OrderMerchant = {
  merchantId: number;
  merchantName: string;
};

type OrderRawAddress = {
  id: number;
  userId: number;
  name: string;
  receiverName: string;
  phoneNumber: string;
  houseNumber: string;
  soi: string;
  road: string;
  village: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  createdAt: string;
  updatedAt: string;
};

type OrderAddress = {
  id: number;
  rawAddress: OrderRawAddress;
  formattedAddress: string;
};

type OrderUser = {
  id: number;
  name: string;
  lastName: string;
  address: OrderAddress;
};

export type OrderItem = {
  id: number;
  merchant: OrderMerchant;
  user: OrderUser;
  products: OrderProduct[];
  status: OrderStatus;
  trackNumber: string | null;
  deliveryCompany: string | null;
  createdAt: string;
};

type OrderListResponse = {
  total: number;
  items: OrderItem[];
};

export async function fetchUserOrders(
  accessToken: string,
): Promise<OrderListResponse> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user orders: " + response.statusText);
  }

  return response.json();
}

type OrderDeliveryRawAddress = {
  houseNumber: string;
  soi: string;
  road: string;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
};

type OrderDeliveryAddress = {
  formattedAddress: string;
  rawAddress: OrderDeliveryRawAddress;
};

export type OrderResponse = {
  id: number;
  paymentId: number | null;
  merchant: OrderMerchant;
  products: OrderProduct[];
  deliveryAddress: OrderDeliveryAddress;
  status: OrderStatus;
  trackNumber: string | null;
  deliveryCompany: string | null;
  createdAt: string;
};

export async function fetchOrderDetails(
  accessToken: string,
  orderId: number,
): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order details: " + response.statusText);
  }

  return response.json();
}

export type OrderRequestBody = {
  productId: number;
  quantity: number;
};

type PlaceOrderRequestBody = {
  userAddressId: number;
  orderData: OrderRequestBody[];
};

export async function userPlaceOrder(
  accessToken: string,
  body: PlaceOrderRequestBody,
): Promise<{ ok: boolean }> {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to place order: " + response.statusText);
  }

  return { ok: true };
}

export type DemoPayOrderRequestBody = {
  paymentMethod: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  cardHolderName: string;
};

export async function userPayOrder(
  accessToken: string,
  orderId: number,
  requestBody: DemoPayOrderRequestBody,
): Promise<{ message: string; ok: boolean }> {
  const response = await fetch(`${API_URL}/orders/${orderId}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    console.log(await response.text());
    throw new Error("Failed to pay for order: " + response.statusText);
  }

  return { message: "Payment successful", ok: true };
}

export async function userConfirmDelivery(
  accessToken: string,
  orderId: number,
): Promise<{ message: string; ok: boolean }> {
  const response = await fetch(`${API_URL}/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: "recived" }),
  });

  if (!response.ok) {
    console.log(response.text());
    throw new Error("Failed to confirm delivery: " + response.statusText);
  }

  return { message: "Delivery confirmed", ok: true };
}
