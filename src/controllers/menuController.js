const menuModel = require("../models/menuModel")

const menuController = {}

menuController.getAllMenu = (req, res) => {
    menuModel.getAllMenu((err, menus) => {
        if (err) {
            console.error("Gagal mengambil data menu:", err);
            return res.status(500).json({
                error: "Gagal mengambil data menu."
            });
        }

        res.json({
            menus: menus
        });
    });
};

menuController.createMenu = (req, res) => {
    const { item, price } = req.body;
    const cekData = [item, price];

    if (cekData.some(data => data === undefined)) {
        return res.status(400).json({
            error: "Field tidak boleh kosong.",
        });
    }

    const menuData = {
        item,
        price
    };

    menuModel.createMenu(menuData, (err, result) => {
        if (err) {
            console.error("Gagal membuat menu baru:", err);
            return res.status(500).json({
                error: "Gagal membuat menu.",
            });
        }

        return res.status(201).json({
            message: "Menu baru berhasil dibuat.",
            menu: result,
        });
    });
};

menuController.deleteMenu = (req, res) => {
    const id = req.params.id;

    menuModel.deleteMenu(id, (err) => {
        if (err) {
            console.error("Gagal menghapus menu:", err);
            return res.status(500).json({
                error: "Gagal menghapus menu.",
            });
        }

        return res.status(200).json({
            message: "Menu berhasil dihapus.",
        });
    });
};

menuController.updateMenu = (req, res) => {
    const menuId = req.params.id;
    const newData = req.body;

    menuModel.updateMenu(menuId, newData, (err) => {
        if (err) {
            console.error("Gagal mengupdate menu:", err);
            return res.status(500).json({
                error: "Gagal mengupdate menu.",
            });
        }

        return res.status(200).json({
            message: "Menu berhasil diupdate.",
        });
    });
};


module.exports = menuController