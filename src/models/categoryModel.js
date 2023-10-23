const db = require("../../db/config")

const categoryModel = {}

categoryModel.getAllCategory = (callback) => {
    db.all("SELECT * FROM categories", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

categoryModel.createCategory = (data, callback) => {
    db.run(`INSERT INTO categories (name) VALUES (?)`, [data.name], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

categoryModel.deleteCategory = (categoryId, callback) => {
    db.get("SELECT * FROM categories WHERE id = ?", [categoryId], (err, listCategory) => {
        if (err) {
            callback(err);
            return;
        }

        if (!listCategory) {
            callback("Kategori tidak ditemukan");
            return;
        }

        db.run("DELETE FROM categories WHERE id = ?", [categoryId], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    });
};

categoryModel.updateCategory = (categoryId, newData, callback) => {
    db.get("SELECT * FROM categories WHERE id = ?", [categoryId], (err, listCategory) => {
        if (err) {
            callback(err);
            return;
        }

        if (!listCategory) {
            callback("Kategori tidak ditemukan");
            return;
        }

        const updatedCategory = {
            ...listCategory,
            ...newData,
        };

        db.run(
            "UPDATE categories SET name = ? WHERE id = ?",
            [updatedCategory.name, categoryId],
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

module.exports = categoryModel