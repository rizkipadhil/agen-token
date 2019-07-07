const modelData = require('../models').Voucher;
const relationData = require('../models').Order;

const allData = async (req, res) => {
    try {
        var data = await modelData.findAll({
            include: [{
                model: relationData
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
        if (req.role_user !== 'admin') res.json({
            status: 0,
            message: 'You dont have Access!'
        })
        const {
            harga,
            nama,
            stok
        } = req.body;
        const serialnumber = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) + '-' + Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) + '-' + Math.floor(Math.random() * (10000 - 1000 + 1) + 1000) + '-' + Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
        var data = await modelData.create({
            harga: harga,
            nama: nama,
            serialnumber: serialnumber,
            stok: stok
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

const updateData = async (req, res) => {
    try {
        if (req.role_user !== 'admin') res.json({
            status: 0,
            message: 'You dont have Access!'
        })
        const {
            harga,
            nama,
            stok
        } = req.body;
        var findData = await modelData.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!findData) res.json({status: 0, message: "Voucher Not Found"});
        const stokData = stok === "" || !stok ? findData.stok : stok;
        const serialnumber = findData.serialnumber; 
        var data = await modelData.update({
            harga: harga,
            nama: nama,
            serialnumber: serialnumber,
            stok: stokData
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

const updateStockData = async (req, res) => {
    try {
        if (req.role_user !== 'admin') res.json({
            status: 0,
            message: 'You dont have Access!'
        })
        const {
            stok
        } = req.body;
        var findData = await modelData.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!findData) res.json({status: 0, message: "Voucher Not Found"});
        const stokData = findData.stok + stok;
        const serialnumber = findData.serialnumber; 
        var data = await modelData.update({
            stok: stokData
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
        if (req.role_user !== 'admin') res.json({
            status: 0,
            message: 'You dont have Access!'
        })
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        const deleteDataRelation = await relationData.destroy({
            where: {
                voucherId: findData.id
            }
        })
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
            }
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
    createData,
    updateData,
    updateStockData,
    deleteData,
    findData
};