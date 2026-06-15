const API_URL = process.env.API_URL ?? "http://localhost:3000";

export type MerchantOrder = {
  id: number;
  user: string;
  trackNumber: string;
  status: string;
  deliveryCompany: string;
  createdAt: string;
};

type GetAllResponse = {
  total: number;
  items: MerchantOrder[];
};

export async function getAllMerchantOrders(
  accessToken: string,
): Promise<GetAllResponse> {
  const response = await fetch(`${API_URL}/merchant/orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
}

type OrderStatus =
  | "ORDER_PLACED"
  | "AWAITING_PAYMENT"
  | "DELIVERED_TO_COURIER"
  | "CONFIRMED"
  | "COMPLETED"
  | "DELIVERED"
  | "CANCELLED";

type OrderAddress = {
  id: number;
  address: string;
};

type RawAddress = {
  id: number;
  userId: number;
  createdAt: Date;
  name: string;
  receiverName: string;
  phoneNumber: string;
  houseNumber: string;
  soi: string | null;
  road: string | null;
  village: string | null;
  subDistrict: string;
  district: string;
  province: string;
  postalCode: string;
  updatedAt: Date;
};

type OrderUser = {
  id: number;
  name: string;
  lastName: string;
  address: OrderAddress;
  rawAddress: RawAddress;
};

type OrderItem = {
  productId: number;
  productName: string;
  quantity: number;
  price: string;
  subTotal: string;
};

export type OrderResponse = {
  id: number;
  user: OrderUser;
  items: OrderItem[];
  status: OrderStatus;
  deliveryCompany: string | null;
  trackingNumber: string | null;
  createdAt: string;
};

export async function getSingleMerchantOrders(
  accessToken: string,
  orderId: number,
): Promise<OrderResponse> {
  const response = await fetch(`${API_URL}/merchant/orders/${orderId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}

export async function updateMerchantOrderStatus(
  accessToken: string,
  orderId: number,
  newStatus: "approve" | "reject" | "deliveredToCourier",
  deliveryCompany?: string,
  trackingNumber?: string,
): Promise<{ ok: boolean }> {
  const response = await fetch(`${API_URL}/merchant/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      status: newStatus,
    }),
  });
  if (!response.ok) {
    console.log(response.text());
    throw new Error(response.statusText);
  }
  return { ok: response.ok };
}

export async function updateMerchantDeliveryInfo(
  accessToken: string,
  orderId: number,
  deliveryCompany: string,
  trackingNumber: string,
): Promise<{ ok: boolean }> {
  const response = await fetch(`${API_URL}/merchant/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      status: "deliveredToCourier",
      deliveryCompany: deliveryCompany,
      trackingNumber: trackingNumber,
    }),
  });
  if (!response.ok) {
    console.log(response.text());
    throw new Error(response.statusText);
  }
  return { ok: response.ok };
}
