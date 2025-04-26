const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const restaurantRoutes = require('./routes/restaurantRoutes');
require('./config/dotenv');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api', restaurantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
