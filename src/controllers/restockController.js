import { RestockModel } from "../models/restockModel.js";

export const RestockController = {
  async create(req, res) {
    const { product_id, supplier, quantity } = req.body;

    if (!product_id) return res.status(400).json({ error: "product_id wajib diisi." });
    if (!supplier || supplier.trim() === "") return res.status(400).json({ error: "supplier wajib diisi." });
    if (!quantity || Number(quantity) <= 0) return res.status(400).json({ error: "quantity harus lebih dari nol." });

    try {
      const result = await RestockModel.create({
        product_id,          
        supplier: supplier.trim(),
        quantity: Number(quantity),
      });
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
