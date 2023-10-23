const orderModel = require("../models/orderModel")

const orderController = {}

orderController.getAllOrder = (req, res) => {
    orderModel.getAllOrder((err, orders) => {
        if (err) {
            console.error("Gagal mengambil data pesanan: ", err);
            return res.status(500).json({
                error: "Gagal mengambil data pesanan."
            });
        }

        res.json({
            orders: orders
        });
    });
};

orderController.getHistory = (req, res) => {
    orderModel.getHistory((err, data) => {
        if (err) {
            // Jika terjadi kesalahan, kirim respons error ke klien
            return res.status(500).json({ error: "Internal Server Error" });
        } else {
            // Jika tidak ada kesalahan, kirim data yang diperoleh dari model ke klien
            return res.status(200).json(data);
        }
    });
}

orderController.createOrder = (req, res) => {
    const { customerId, menuList, orderDate } = req.body;
    const cekData = [customerId, menuList, orderDate];
    if (cekData.some(data => data === undefined)) {
        return res.status(400).json({
            error: "Field tidak boleh kosong.",
        });
    }

    orderModel.createOrder(customerId, menuList, orderDate, (err, result) => {
        if (err) {
            console.error("Gagal membuat pesanan baru:", err);
            return res.status(500).json({
                error: "Gagal membuat pesanan."
            });
        }

        let totalHarga = 0;
        menuList.forEach(menuItem => {
            totalHarga += menuItem.qty * menuItem.price;
        });

        return res.status(201).json({
            status: "OK",
            message: "Pesanan berhasil dibuat.",
            menuList,
            totalOrder: totalHarga,
            orderDate: orderDate
        });
    });
};

module.exports = orderController;
