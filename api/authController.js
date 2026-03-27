import { initiatePayment } from "./interswitchPayment";
// import { sendVerificationCode } from "./whatsappVerification";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { action } = req.body;

  // if (action === "login") {
  //   return await sendVerificationCode(req, res);
  // }
  if (action === "checkout") {
    return await initiatePayment(req, res);
  }

  res.status(400).json({ error: "Invalid action" });
}

