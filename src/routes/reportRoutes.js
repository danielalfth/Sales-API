import express from "express";
import { supabase } from "../config/supabaseClient.js";

const router = express.Router();

router.get("/total", async (req, res) => {
  const { count, error } = await supabase
    .from("customers")
    .select("*", { count: "exact", head: true });

  if (error)
    return res.status(500).json({ success: false, message: error.message, data: null });

  res.json({ success: true, message: "Total pelanggan berhasil dihitung.", data: { total: count } });
});

export default router;
