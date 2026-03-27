import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const { reference, amount } = req.query;
  const merchantCode = "MX21696"; // test merchant code

  try {
    const url = `https://qa.interswitchng.com/collections/api/v1/gettransaction.json?merchantcode=${merchantCode}&transactionreference=${reference}&amount=${amount}`;
    const response = await axios.get(url, {
      headers: { "Content-Type": "application/json" }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
