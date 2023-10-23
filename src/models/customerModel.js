const db = require("../../db/config")

const customerModel = {}

customerModel.getAllCust = (callback) => {
    db.all("SELECT * FROM customer", (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
}

customerModel.createCust = (data, callback) => {

    db.run(`INSERT INTO customer (name, address, email) VALUES (?, ?, ?)`, [data.name, data.address, data.email], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

customerModel.deleteCust = (custId, callback) => {
    db.get("SELECT * FROM customer WHERE id = ?", [custId], (err, listCust) => {
        if (err) {
            callback(err);
            return;
        }

        if (!listCust) {
            callback("Customer tidak ditemukan");
            return;
        }

        db.run("DELETE FROM customer WHERE id = ?", [custId], (err) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    });
};

customerModel.updateCust = (custId, newData, callback) => {
    db.get("SELECT * FROM customer WHERE id = ?", [custId], (err, listCust) => {
        if (err) {
            callback(err);
            return;
        }

        if (!listCust) {
            callback("Customer tidak ditemukan");
            return;
        }

        const updatedCust = {
            ...listCust,
            ...newData,
        };

        db.run(
            "UPDATE customer SET name = ?, address = ?, email = ? WHERE id = ?",
            [updatedCust.name, updatedCust.address, updatedCust.email, custId],
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

module.exports = customerModel