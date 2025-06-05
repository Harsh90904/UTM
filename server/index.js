const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const DB = require('./config/DB');
const sellerrouter = require('./router/sellerAccountRoutes');
const orderrouter = require('./router/OrderRouter');
const productRouter = require('./router/ProductRouter');
const tdsRecordRouter = require('./router/TDSRecordRouter');
const returnAnalysisRouter = require('./router/ReturnAnalysisRouter');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('😊Hello World!');
})
app.use('/api/order', orderrouter)
app.use('/api/product', productRouter)
app.use('/api/tdsrecord', tdsRecordRouter);
app.use('/api/seller', sellerrouter)
app.use('/api/returnanalysis', returnAnalysisRouter);

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    DB();
})
