import { CustomerModel } from "../models/customerModel.js";

export const CustomerController = {
  async getAll(req, res) {
    try {
      const data = await CustomerModel.getAll();
      res.json({ success: true, message: "Daftar pelanggan berhasil diambil.", data });
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
    try {
      const data = await CustomerModel.create(req.body);
      res.status(201).json({ success: true, message: "Pelanggan berhasil dibuat.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async update(req, res) {
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
