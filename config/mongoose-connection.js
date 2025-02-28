const mongoose = require('mongoose');

const config = require('config');

const dbgr = require('debug')("development: mongoose"); // It's a debugger . It's used rather than console.log 
                                                    // It doesnot print anything ultil you set any environment variables 
                                                    // How to create environment variable: 
                                                        // set DEBUG=development:*

mongoose.connect(`${config.get("MONGODB_URI")}/GeruInstaMart`) // custom uri 
.then(() => {
    dbgr("connected");
})
.catch((err) => {
    dbgr(err);
})

module.exports = mongoose.connection;