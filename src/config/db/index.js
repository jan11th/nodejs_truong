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
        console.log('--- Connect Successfully!! ---')
    } catch (error) {
        console.log('--- Connect Failure!! ---')
    }
    
}

module.exports = { connect };
