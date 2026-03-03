"use client";
import { useState } from "react";

interface Purchase {
  id: string;
  itemName: string;
  date: string;
  amount: string;
  status: string;
}

const samplePurchases: Purchase[] = [
  {
    id: "1",
    itemName: "Board Game Starter Pack",
    date: "2026-02-15",
    amount: "$49.99",
    status: "Delivered",
  },
  {
    id: "2",
    itemName: "Upgrade Expansion Set",
    date: "2026-02-23",
    amount: "$19.99",
    status: "Shipped",
  },
  {
    id: "3",
    itemName: "Miniatures Bundle",
    date: "2026-03-01",
    amount: "$29.99",
    status: "Processing",
  },
];

export function PurchaseInfo() {
  const [purchases] = useState<Purchase[]>(samplePurchases);

  return (
    <div className="bg-[#F9FAFB] rounded-md shadow-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[#364049]/10">
        <div>
          <h2 className="text-primary font-semibold text-lg">
            Purchase Information
          </h2>
          <p className="text-secondary text-sm">View your order history</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {purchases.length === 0 ? (
          <p className="text-muted text-sm italic">No purchases yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-primary">
              <thead className="uppercase text-secondary">
                <tr>
                  <th className="px-4 py-2">Item</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((order) => (
                  <tr key={order.id} className="border-t border-[#364049]/10">
                    <td className="px-4 py-2">{order.itemName}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">{order.amount}</td>
                    <td className="px-4 py-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
