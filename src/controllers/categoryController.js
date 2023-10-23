const categoryModel = require("../models/categoryModel")

const categoryController = {}

categoryController.getAllCategory = (req, res) => {
    categoryModel.getAllCategory((err, categories) => {
        if (err) {
            console.error("Gagal mengambil data kategori:", err);
            return res.status(500).json({
                error: "Gagal mengambil data kategori."
            });
        }

        res.json({
            categories: categories
        });
    });
};

categoryController.createCategory = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Field nama tidak boleh dikosongkan",
        });
    }

    const categoryData = {
        name: name,
    };

    categoryModel.createCategory(categoryData, (err, result) => {
        if (err) {
            console.error("Gagal membuat kategori:", err);
            return res.status(500).json({
                error: "Gagal membuat kategori.",
            });
        }

        return res.status(201).json({
            message: "Kategori baru berhasil dibuat.",
            category: result,
        });
    });
};

categoryController.deleteCategory = (req, res) => {
    const id = req.params.id;

    categoryModel.deleteCategory(id, (err) => {
        if (err) {
            console.error("Gagal menghapus kategori:", err);
            return res.status(500).json({
                error: "Gagal menghapus kategori.",
            });
        }

        return res.status(200).json({
            message: "Kategori berhasil dihapus.",
        });
    });
};

categoryController.updateCategory = (req, res) => {
    const categoryId = req.params.id; // Mengambil ID dari parameter URL
    const newData = req.body; // Mengambil data baru dari body permintaan

    categoryModel.updateCategory(categoryId, newData, (err) => {
        if (err) {
            console.error("Gagal mengupdate kategori:", err);
            return res.status(500).json({
                error: "Gagal mengupdate kategori.",
            });
        }

        return res.status(200).json({
            message: "Kategori berhasil diupdate.",
        });
    });
};

module.exports = categoryController