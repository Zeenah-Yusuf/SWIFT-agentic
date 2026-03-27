import getTransaction from "./getTransaction";
import confirmTransaction from "./confirmTransaction";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { action } = req.body;

  if (action === "checkout") {
    // Step 1: confirm the transaction
    await confirmTransaction(req, res);

    // Step 2: fetch transaction details
    return await getTransaction(req, res);
  }

  res.status(400).json({ error: "Invalid action" });
}
