"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState("Verifying...");
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (!reference) return;
    async function verify() {
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();
        if (data.status === "success") {
          setStatus("Payment Successful!");
          // Optionally fetch order details here from DB if needed
        } else {
          setStatus("Payment Failed");
        }
      } catch (err) {
        setStatus("Verification Error");
        console.error(err);
      }
    }
    verify();
  }, [reference]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-4">{status}</h1>
      {status === "Payment Successful!" && (
        <p className="text-lg text-gray-700 max-w-md text-center">
          Thank you for your order! Your book will be shipped soon. You can keep this
          page open to track your order updates.
        </p>
      )}
    </main>
  );
}
