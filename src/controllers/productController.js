import { ProductModel } from "../models/productModel.js";

export const ProductController = {
  async getAll(req, res) {
    try {
      const data = await ProductModel.getAll(req.query.category_id);
      res.json({ success: true, message: "Daftar produk berhasil diambil.", data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message, data: null });
    }
  },

  async getById(req, res) {
    try {
      const data = await ProductModel.getById(req.params.id);
      res.json({ success: true, message: "Produk berhasil diambil.", data });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message, data: null });
    }
  },

  async create(req, res) {
    const { price, stock } = req.body;

    // ponytail: manual guard at trust boundary; covers NaN/undefined via Number()
    if (Number(price) < 0)
      return res.status(400).json({ success: false, message: "Harga (price) tidak boleh di bawah nol.", data: null });
    if (Number(stock) < 0)
      return res.status(400).json({ success: false, message: "Stok (stock) tidak boleh di bawah nol.", data: null });

    try {
      const data = await ProductModel.create(req.body);
      res.status(201).json({ success: true, message: "Produk berhasil dibuat.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async update(req, res) {
    try {
      const data = await ProductModel.update(req.params.id, req.body);
      res.json({ success: true, message: "Produk berhasil diperbarui.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async remove(req, res) {
    try {
      await ProductModel.remove(req.params.id);
      res.json({ success: true, message: "Produk berhasil dihapus.", data: null });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },
};
