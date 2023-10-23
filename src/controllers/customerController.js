const customerModel = require("../models/customerModel")

const customerController = {}

customerController.
    getAllCust = (req, res) => {
        customerModel.getAllCust((err, customers) => {
            if (err) {
                console.error("Gagal mengambil data customer:", err);
                return res.status(500).json({
                    error: "Gagal mengambil data customer."
                });
            }

            res.json({
                customers: customers
            });
        });
    };

customerController.createCust = (req, res) => {
    const { name, address, email } = req.body;
    const cekData = [name, address, email];

    if (cekData.some(data => data === undefined)) {
        return res.status(400).json({
            error: "Field tidak boleh kosong.",
        });
    }

    const customerData = {
        name,
        address,
        email
    };

    customerModel.createCust(customerData, (err, result) => {
        if (err) {
            console.error("Gagal membuat customer baru:", err);
            return res.status(500).json({
                error: "Gagal membuat customer."
            });
        }

        return res.status(201).json({
            message: "Customer baru berhasil dibuat.",
            customer: result,
        });
    });
};

customerController.deleteCust = (req, res) => {
    const id = req.params.id;

    customerModel.deleteCust(id, (err) => {
        if (err) {
            console.error("Gagal menghapus customer:", err);
            return res.status(500).json({
                error: "Gagal menghapus customer.",
            });
        }

        return res.status(200).json({
            message: "Customer berhasil dihapus.",
        });
    });
};

customerController.updateCust = (req, res) => {
    const custId = req.params.id;
    const newData = req.body;

    customerModel.updateCust(custId, newData, (err) => {
        if (err) {
            console.error("Gagal mengupdate customer:", err);
            return res.status(500).json({
                error: "Gagal mengupdate customer.",
            });
        }

        return res.status(200).json({
            message: "Customer berhasil diupdate.",
        });
    });
};

module.exports = customerController