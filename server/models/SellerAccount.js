const mongoose = require('mongoose');

const sellerAccountSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    marketplace: { 
        type: String, 
        enum: ['Amazon', 'Flipkart', 'Others'] 
    },
    apiCredentials: Object,
    xlsFilePath: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

const SellerAccount = mongoose.model('SellerAccount', sellerAccountSchema);
module.exports = SellerAccount;