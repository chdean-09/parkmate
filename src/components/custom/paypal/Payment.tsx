"use client";
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from "@paypal/react-paypal-js";

export default function PayPalPayment() {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId:
      process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "YOUR_FALLBACK_CLIENT_ID",
    currency: "USD",
  };

  const createOrder = async () => {
    const response = await fetch("/api/paypal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart: [
          {
            id: "YOUR_PRODUCT_ID",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    });
    const data = await response.json();
    return data.id;
  };

  const onApprove = async (data: { orderID: string }, actions: any) => {
    try {
      const response = await fetch(`/api/paypal?orderID=${data.orderID}`, {
        method: "POST",
      });
      const details = await response.json();

      if (details.error) {
        throw new Error(details.error);
      }

      alert(`Transaction completed by ${details.payer.name.given_name}`);
    } catch (error) {
      console.error("Error capturing order:", error);
      alert("An error occurred while capturing the order. Please try again.");
    }
  };

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
}
