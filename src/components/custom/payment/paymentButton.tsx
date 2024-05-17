"use client";

import React, { useState } from "react";

type Props = {
  totalPayment: number;
  userId: string;
};

const PaymentButton: React.FC<Props> = ({ totalPayment, userId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ totalPayment, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment failed!");
      }

      const { data } = await response.json();
      alert("User: " + data.userId + " Paid: " + data.totalPayment);
    } catch (err: any) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <p>{error}</p>}
    </>
  );
};

export default PaymentButton;
