const modelData = require('../models').Order;
const relationDataVoucher = require('../models').Voucher;
const relationDataUser = require('../models').User;

const allData = async (req, res) => {
    try {
        if(req.role_user !== 'admin') res.json({ status: 0, message: 'You dont have Access!' })
        var data = await modelData.findAll({
            include: [{
                model: relationDataVoucher
            }, 
            {
                model: relationDataUser
            }]
        });
        res.json({
            status: 200,
            message: 'Success',
            data: data
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
};

const allUserOrderData = async (req, res) => {
    try {
        var data = await modelData.findAll({
            where:{
              userId: req.user_active.id  
            },
            include: [{
                model: relationDataVoucher
            }, 
            {
                model: relationDataUser
            }]
        });
        res.json({
            status: 200,
            message: 'Success',
            data: data
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
};

const createData = async (req, res) => {
    try {
        const {
            voucherId
        } = req.body;
        const jumlah = 1;
        const dataUser = await relationDataUser.findOne({
            where: {
                id: req.user_active.id
            }
        });
        const dataVoucher = await relationDataVoucher.findOne({
            where: {
                id: voucherId
            }
        });
        var nominal = jumlah*dataVoucher.harga;
        if (dataUser.saldo < nominal) {
            res.json({
                status: 200,
                message: "Please, Topup your balance."
            });
            die();
        }
        if (dataVoucher.stok < jumlah){
            res.json({
                status: 200,
                message: "Sorry, There is not enough stock",
                voucher: dataVoucher
            });
            die();
        }
        var data = await modelData.create({
            voucherId: voucherId,
            userId: dataUser.id,
            jumlah: jumlah,
            nominal: nominal
        });
        var saldo = dataUser.saldo - nominal;
        const User = await relationDataUser.update({
            saldo: saldo
        }, {
            where: {
                id: dataUser.id
            }
        });
        var stokBarang = dataVoucher.stok - 1;
        const Voucher = await relationDataVoucher.update({
            stok: stokBarang
        }, {
            where: {
                id: voucherId
            }
        });
        res.json({
            status: 200,
            message: 'Success',
            data: data
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

const deleteData = async (req, res) => {
    try {
        if (req.role_user !== 'admin') res.json({
            status: 0,
            message: 'You dont have Access!'
        })
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        const deleteData = await modelData.destroy({
            where: {
                id: req.params.id
            }
        })
        res.json({
            status: 200,
            message: 'Success',
            data: findData
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

const findData = async (req, res) => {
    try {
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: relationDataVoucher
                },
                {
                    model: relationDataUser
                }
            ]
        });
        res.json({
            status: 200,
            message: 'Success',
            data: findData
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

module.exports = {
    allData,
    allUserOrderData,
    createData,
    deleteData,
    findData
};