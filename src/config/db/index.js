const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/truong_beproject_dev',
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        });
        console.log('Kết nối thành công!!')
    } catch (error) {
        console.log('Kết nối thất bại!!')
    }
    
}

module.exports = { connect };
