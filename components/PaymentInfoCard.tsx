"use client";
import { DatePicker, Form, GetProp, Input, Select } from "antd";
import { SectionCard } from "./Cards";
import { useState } from "react";

type PaymentOptions = GetProp<typeof Select, "options">;

export function PaymentInfoCard() {
  const [method, setMethod] = useState<string>();
  const [paymentMethods, setPaymentMethods] = useState<PaymentOptions>([
    { label: "Mastercard", value: "mastercard" },
    { label: "ThaiQR", value: "thaiqr", disabled: true },
    { label: "Paypal", value: "paypal", disabled: true },
  ]);
  return (
    <SectionCard title={"Payment Information"} description={""}>
      <Form.Item label="Payment method" name="paymentMethod">
        <Select
          options={paymentMethods}
          onChange={(method) => setMethod(method)}
          value={method}
        />
      </Form.Item>
      {method === "mastercard" ? <MasterCardForm /> : null}
    </SectionCard>
  );
}

function MasterCardForm() {
  return (
    <>
      <div className="flex gap-6">
        {/* Card number */}
        <Form.Item
          label="Debit Card Number"
          name="cardNumber"
          normalize={(value) => {
            const v = value.replace(/\D/g, "");
            return v.replace(/(\d{4})/g, "$1 ").trim();
          }}
          rules={[
            { required: true, message: "Please input your card number!" },
            {
              pattern: /^(\d{4}\s){3}\d{3,4}$/,
              message: "Please enter a valid card number!",
            },
          ]}
        >
          <Input
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            style={{ width: "100%", fontSize: "16px" }}
          />
        </Form.Item>

        {/* Expired date */}
        <Form.Item label="Expiry date" name="expiryDate">
          <DatePicker picker="month" format="MM/YY" allowClear={false} />
        </Form.Item>

        {/* CVV */}
        <Form.Item
          label="CVV"
          name="cvv"
          normalize={(value) => {
            const v = value.replace(/\D/g, "");
            return v.replace(/(\d{4})/g, "$1 ").trim();
          }}
        >
          <Input maxLength={3} />
        </Form.Item>
      </div>

      {/* Card holder name */}
      <Form.Item label="Card holder name" name="cardHolderName">
        <Input />
      </Form.Item>
    </>
  );
}
