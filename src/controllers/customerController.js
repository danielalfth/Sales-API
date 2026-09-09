import { CustomerModel } from "../models/customerModel.js";

// ponytail: inline guard — hanya dua aturan, tidak perlu library validasi
function validateCustomerInput({ email, phone }) {
  if (email && !email.includes("@"))
    return "Email harus mengandung karakter @.";
  if (phone && phone.length < 10)
    return "Nomor telepon minimal 10 karakter.";
  return null;
}

export const CustomerController = {
  async getAll(req, res) {
    try {
      const { name, page = 1, limit = 10 } = req.query;
      const result = await CustomerModel.getAll(name, Number(page), Number(limit));
      res.json({
        success: true,
        message: "Daftar pelanggan berhasil diambil.",
        data: result.data,
        pagination: {
          total: result.total,
          page: result.page,
          limit: result.limit,
          total_pages: Math.ceil(result.total / result.limit),
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message, data: null });
    }
  },

  async getById(req, res) {
    try {
      const data = await CustomerModel.getById(req.params.id);
      res.json({ success: true, message: "Pelanggan berhasil diambil.", data });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message, data: null });
    }
  },

  async create(req, res) {
    const validationError = validateCustomerInput(req.body);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError, data: null });

    try {
      const data = await CustomerModel.create(req.body);
      res.status(201).json({ success: true, message: "Pelanggan berhasil dibuat.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async update(req, res) {
    const validationError = validateCustomerInput(req.body);
    if (validationError)
      return res.status(400).json({ success: false, message: validationError, data: null });

    try {
      const data = await CustomerModel.update(req.params.id, req.body);
      res.json({ success: true, message: "Pelanggan berhasil diperbarui.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async remove(req, res) {
    try {
      await CustomerModel.remove(req.params.id);
      res.json({ success: true, message: "Pelanggan berhasil dihapus.", data: null });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },
};
