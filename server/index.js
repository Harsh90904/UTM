const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const DB = require('./config/DB');
const sellerrouter = require('./router/sellerAccountRoutes');
const orderrouter = require('./router/OrderRouter');
const productRouter = require('./router/ProductRouter');
const tdsRecordRouter = require('./router/TDSRecordRouter');
const returnAnalysisRouter = require('./router/ReturnAnalysisRouter');
const userRouter = require('./router/UserRouter');
const path = require('path');
const fs = require('fs');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('😊 Wellcome to the UTM');
});

// --- Demo API for Seller Account Credentials ---
app.get('/api/demo-seller', (req, res) => {
    const demoPath = path.join(__dirname, 'demo.json');
    fs.readFile(demoPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Demo data not found.' });
        }
        res.json(JSON.parse(data));
    });
});
// ----------------------------------------------

app.use('/api/order', orderrouter)
app.use('/api/product', productRouter)
app.use('/api/tdsrecord', tdsRecordRouter);
app.use('/api/seller', sellerrouter);
app.use('/api/returnanalysis', returnAnalysisRouter);
app.use("/api/user", userRouter );

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    DB();
});
