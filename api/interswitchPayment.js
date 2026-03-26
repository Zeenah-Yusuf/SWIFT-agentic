import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { amount, customerId } = req.body;

  try {
    const response = await axios.post(
      "https://sandbox.interswitchng.com/api/v1/payments",
      {
        amount,
        customerId,
        currency: "NGN",
        redirectUrl: "https://yourdomain.com/payment/callback"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.INTERSWITCH_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
}

