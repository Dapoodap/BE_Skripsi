const { Sequelize } = require("sequelize")
const Op = Sequelize.Op
const modelAdmin = require('../model/Account/Admin')
const modelPenghuni = require('../model/Account/Penghuni')
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    LoginPenghuni : async (req,res)=>{
        try {
            const {username,password} = req.body
            const theUser = await modelPenghuni.findOne({
                where :{
                    username,
                }
            });
            if (!theUser) {
                return res.status(401).json({ message: 'Username atau password salah' });
            }
            const passwordMatch = await bycrpt.compare(password, theUser.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Username atau password salah' });
              }
              const token = jwt.sign({ id : theUser.id, data:"coba role" }, 'skripsiDapo', { expiresIn: '1h' });
              return res.status(200).json({ message: 'Login berhasil', token });
            } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    },
    LoginAdmin : async (req,res)=>{
        try {
            const {username,password} = req.body
            const theUser = await modelAdmin.findOne({
                where :{
                    username,
                }
            });
            if (!theUser) {
                return res.status(401).json({ message: 'Username atau password salah' });
            }
            const passwordMatch = await bycrpt.compare(password, theUser.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Username atau password salah' });
              }
              const token = jwt.sign({ id : theUser.id }, 'skripsiDapo', { expiresIn: '1h' });
              return res.status(200).json({ message: 'Login berhasil', token });
            } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: 500,
                success: false,
                message: "internal server error",
                data: null
                });
        }
    }
}