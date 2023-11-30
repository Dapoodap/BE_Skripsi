require('dotenv').config()
const express = require ('express')
const app = express()

const allRoute = require('./routes/index')
const db = require('./config/DB')
const Penghuni = require('./model/Account/Penghuni')


app.use(allRoute)
app.listen(process.env.port,()=>{
    console.log(`Example app listening at http://localhost:${process.env.port}`)
})
db.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    db.sync().then(() => {
        console.log('All tables created successfully!');
    }).catch((error) => {
        console.error('Unable to create tables: ', error);
    });
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = app;