const { Sequelize } = require("sequelize")
const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken : (req, res, next) => {
        const token = req.header('Authorization');
      
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
      
        try {
          const decoded = jwt.verify(token, 'skripsiDapo'); // Gantilah 'yourSecretKey' dengan kunci rahasia yang digunakan untuk menandatangani token
          req.user = decoded;
          next();
        } catch (error) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
      },
      decodeToken : (req, res, next) => {
        const token = req.header('Authorization');
      
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized - No token provided' });
        }
      
        try {
          const decoded = jwt.verify(token, 'skripsiDapo'); // Gantilah 'yourSecretKey' dengan kunci rahasia yang digunakan untuk menandatangani token
          return res.status(200).json({
            status: 200,
            success: true,
            message: "data decoded",
            data: decoded.id
          });
        } catch (error) {
          return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
      },
    }