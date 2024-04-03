const mongoose = require('mongoose')
const conn_str = "mongodb+srv://ashmitharengasamy96:gwJenBY7wv86bDnI@finalproj.l7bz8hb.mongodb.net/timesheet"
mongoose.connect(conn_str).then(() => console.log("Connected Successsfully")).catch((err) => console.log(err))
module.exports = {
    mongoose
}