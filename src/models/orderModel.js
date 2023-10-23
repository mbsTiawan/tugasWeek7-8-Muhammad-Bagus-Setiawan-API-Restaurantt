const db = require("../../db/config")

const orderModel = {}

orderModel.getAllOrder = (callback) => {
    db.all("SELECT * FROM orders", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

orderModel.getHistory = (callback) => {

    db.all("SELECT customer.name as customer_name, orders.order_date, GROUP_CONCAT(json_object('menu_name', menu.item, 'price', menu.price, 'qty', orders.qty)) AS ordered_menus FROM orders INNER JOIN customer ON orders.customer_id = customer.id INNER JOIN menu ON orders.menu_id = menu.id GROUP BY customer_name, order_date", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            const formattedRows = rows.map(row => {
                const orderedMenus = JSON.parse(`[${row.ordered_menus}]`);
                const formattedOrderedMenus = orderedMenus.map(menu => {
                    return JSON.stringify(menu);
                });
                return {
                    customer_name: row.customer_name,
                    order_date: row.order_date,
                    ordered_menus: formattedOrderedMenus
                };
            });
            callback(null, formattedRows);
        }
    });
}

orderModel.createOrder = (customerId, menuList, orderDate, callback) => {
    if (!customerId) {
        return callback("ID Pelanggan tidak boleh kosong", null);
    }

    if (!menuList || !Array.isArray(menuList) || menuList.length === 0) {
        return callback("Menu tidak boleh kosong", null);
    }

    const values = [];
    const errors = [];

    menuList.forEach(menuItem => {
        const { menuName, price, qty } = menuItem;

        if (!menuName) {
            errors.push("Nama Menu tidak boleh kosong");
        }
        if (!price) {
            errors.push("Harga tidak boleh kosong");
        }
        if (!qty) {
            errors.push("Qty tidak boleh kosong");
        }
        values.push([menuName, price, qty]);
    });

    if (errors.length > 0) {
        return callback(errors.join(", "), null);
    }

    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        menuList.forEach(menuItem => {
            const { menuName, price, qty } = menuItem;

            db.get("SELECT * FROM menu WHERE item = ? AND price = ?", [menuName, price], (menuErr, menuRow) => {
                if (menuErr) {
                    db.run("ROLLBACK", () => {
                        callback("Error dalam validasi Menu", null);
                    });
                    return;
                }

                if (!menuRow) {

                    db.run("ROLLBACK", () => {
                        callback("Menu yang diberikan tidak ditemukan", null);
                    });
                    return;

                } else {

                    const menuId = menuRow.id;
                    const sql = `INSERT INTO orders (customer_id, menu_id, qty, order_date) VALUES (?, ?, ?, ?)`;

                    db.run(sql, [customerId, menuId, qty, orderDate], function (err) {
                        if (err) {
                            db.run("ROLLBACK", () => {
                                callback("Gagal membuat pesanan baru", null);
                            });
                            return;
                        }
                    });

                    db.run("COMMIT", function (err) {
                        if (err) {
                            db.run("ROLLBACK", () => {
                                callback("Gagal menyelesaikan pesanan", null);
                            });
                            return;
                        }
                        callback(null, { message: "Pesanan berhasil ditempatkan" });
                    });
                }
            });
        });

    });
};

module.exports = orderModel