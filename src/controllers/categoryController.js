import { CategoryModel } from "../models/categoryModel.js";

export const CategoryController = {
  async create(req, res) {
    try {
      const { name } = req.body;
      const data = await CategoryModel.create(name);
      res.status(201).json({ success: true, message: "Kategori berhasil dibuat.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async getAll(req, res) {
    try {
      const data = await CategoryModel.getAll();
      res.json({ success: true, message: "Daftar kategori berhasil diambil.", data });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message, data: null });
    }
  },

  async getById(req, res) {
    try {
      const data = await CategoryModel.getById(req.params.id);
      res.json({ success: true, message: "Kategori berhasil diambil.", data });
    } catch (err) {
      res.status(404).json({ success: false, message: err.message, data: null });
    }
  },

  async update(req, res) {
    try {
      const data = await CategoryModel.update(req.params.id, req.body.name);
      res.json({ success: true, message: "Kategori berhasil diperbarui.", data });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },

  async remove(req, res) {
    try {
      await CategoryModel.remove(req.params.id);
      res.json({ success: true, message: "Kategori berhasil dihapus.", data: null });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message, data: null });
    }
  },
};
