const db = require("../../db/config")

const menuModel = {}

menuModel.getAllMenu = (callback) => {
    db.all("SELECT * FROM menu", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

menuModel.createMenu = (data, callback) => {

    db.run(`INSERT INTO menu (item, price) VALUES (?, ?)`, [data.item, data.price], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

menuModel.deleteMenu = (menuId, callback) => {
    db.get("SELECT * FROM menu WHERE id = ?", [menuId], (err, listMenu) => {
        if (err) {
            callback(err);
            return;
        }

        if (!listMenu) {
            callback("Menu tidak ditemukan");
            return;
        }

        db.run("DELETE FROM menu WHERE id = ?", [menuId], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    });
};

menuModel.updateMenu = (menuId, newData, callback) => {
    db.get("SELECT * FROM menu WHERE id = ?", [menuId], (err, listMenu) => {
        if (err) {
            callback(err);
            return;
        }

        if (!listMenu) {
            callback("Menu tidak ditemukan");
            return;
        }

        const updatedMenu = {
            ...listMenu,
            ...newData,
        };

        db.run(
            "UPDATE menu SET item = ?, price = ? WHERE id = ?",
            [updatedMenu.item, updatedMenu.price, menuId],
            (err) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            }
        );
    });
};

module.exports = menuModel