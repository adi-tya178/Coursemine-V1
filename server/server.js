const express = require('express')
const morgon = require('morgan')
const bodyParser = require('body-parser')
const cors  = require('cors')
const mongoose = require('mongoose')
require('dotenv').config();


const app = express();

mongoose.connect(process.env.DATABASE_CLOUD, {useNewUrlParser: true, useUnifiedTopology: true })

.then( () => console.log('DB connected'))
.catch(err => console.log(err) );
// import routes
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const categoryRoutes = require('./Routes/category');
const linkRoutes = require('./Routes/link');


//middlewares

app.use(morgon('dev'));
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
//app.use(cors());

app.use(cors({origin: process.env.CLIENT_URL}));


app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', linkRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`API is running on port ${port}`));
