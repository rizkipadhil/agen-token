const modelData = require('../models').Order;
const relationDataVoucher = require('../models').Voucher;
const relationDataUser = require('../models').User;

const allData = async (req, res) => {
    try {
        if(req.user_role !== 'admin') res.json({ status: 0, message: 'You dont have Access!' })
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
              userId: req.params.id  
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
            voucherId,
            userId,
            jumlah,
            nominal
        } = req.body;
        const vanumber = "VA" + Math.floor(Math.random() * (100000 - 10000 + 1) + 10000);
        var data = await modelData.create({
            voucherId: voucherId,
            userId: userId,
            vanumber: vanumber,
            jumlah: jumlah,
            nominal: nominal
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

const updateStatusData = async (req, res) => {
    try {
        var findData = await modelData.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!findData) res.json({status: 0, message: "Order Not Found"});
        var data = await modelData.update({
            voucherId: voucherId,
            userId: userId,
            jumlah: jumlah,
            nominal: nominal
        }, 
        {
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: 200,
            message: 'Success',
            data: req.body
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
        if (req.user_role !== 'admin') res.json({
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
    updateData,
    deleteData,
    findData
};