const modelData = require('../models').topup;
const relationDataUser = require('../models').User;
const relationDatakonfirmasi = require('../models').konfirmasi;

const allData = async (req, res) => {
    try {
        if (req.role_user !== 'admin') res.json({
            status: 0,
            message: 'You dont have Access!'
        })
        var data = await modelData.findAll({
            include: [
                {
                    model: relationDataUser
                }
            ]
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
            where: {
                userId: req.user_active.id
            },
            include: [
                {
                    model: relationDataUser
                }
            ]
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
            userId,
            nominal
        } = req.body;
        const taxcode = "VA" + Math.floor(Math.random() * (100000 - 10000 + 1) + 10000);
        const uniquevalue = Math.floor(Math.random() * (1000 - 100 + 1) + 100);
        var data = await modelData.create({
            userId: userId,
            nominal: nominal,
            taxcode: taxcode,
            uniquevalue: uniquevalue
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
        // status proses, batal
        var data = await modelData.update({
            status: req.params.status
        }, {
            where: {
                id: req.params.id
            }
        });
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: 200,
            message: 'Success',
            data: findOne
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

const konfirmasiData = async (req, res) => {
    try {
        const {
            banknumber,
            nama
        } = req.body;
        var findData = await modelData.findOne({
            where: {
                id: req.params.id
            }
        });
        if (findData.status !== 'proses'){
            res.json({
                status: 0,
                message: "Can't Change Topup Status!"
            });
            die();
        } 
        var dataRelation = await relationDatakonfirmasi.create({
            userId: req.user_active.id,
            topupId:req.params.id,
            banknumber:banknumber,
            nama:nama
        });
        var data = await modelData.update({
            status: "konfirmasi"
        }, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            status: 200,
            message: "Please Wait, until admin confirm!"
        })
    } catch (error) {
        console.log(error);
        res.json({
            status: error.code,
            message: error.message
        })
    }
}

const updateKonfirmasiData = async (req, res) => {
    try {
        // status diterima, ditolak
        var findData = await relationDatakonfirmasi.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: modelData
            }]
        });
        if (findData.status !== 'proses') {
            res.json({
                status: 0,
                message: "Can't Change Konfirmasi Status!"
            });
            die();
        }
        var data = await modelData.update({
            status: req.params.status
        }, {
            where: {
                id: findData.topupId
            }
        });
        var dataRelation = await relationDatakonfirmasi.update({
            status: req.params.status
        }, {
            where: {
                id: req.params.id
            }
        });
        if (req.params.status === 'diterima') {
            var findDataRelation = await relationDataUser.findOne({
                where: {
                    id: req.user_active.id
                }
            });
            var saldo = findData.topup['nominal'] + findDataRelation.saldo;
            const User = await relationDataUser.update({
                saldo: saldo
            }, {
                where: {
                    id: findDataRelation.id
                }
            })
            res.json({
                status: 200,
                message: 'Success, Please Check your current balance! '
            });
        }else{
            res.json({
                status: 0,
                message: "Sorry, Your payment rejected!"
            });
        }
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
        const deleteDataRelation= await relationDatakonfirmasi.destroy({
            where: {
                topupId: req.params.id
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
            include: [
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
    updateStatusData,
    konfirmasiData,
    updateKonfirmasiData,
    deleteData,
    findData
};