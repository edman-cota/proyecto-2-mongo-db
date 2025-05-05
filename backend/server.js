const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const orderRoutes = require('./routes/orderRoutes');

require('./config/dotenv');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', restaurantRoutes);
app.use('/api', menuItemRoutes);
app.use('/api', authenticationRoutes);
app.use('/api', reviewRoutes);
app.use('/api', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
