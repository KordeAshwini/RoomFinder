// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');

// const authRoutes = require('./routes/authRoutes');
// const TenantRoutes = require('./routes/tenantRoutes');
// const propertyRoutes = require('./routes/propertyRoutes');
// const allPropertyRoutes = require('./routes/allpropertyRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // connect DB
// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

// app.get('/', (req, res) => res.send('RoomFinder API running'));

// app.use('/api/auth', authRoutes);
// app.use('/api/tenant-profile', TenantRoutes);
// app.use("/api/properties", propertyRoutes);
// app.use("/api/allproperties", allPropertyRoutes);
// app.use("/api/bookings", bookingRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const TenantRoutes = require('./routes/tenantRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const allPropertyRoutes = require('./routes/allpropertyRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const visitRoutes = require("./routes/visitRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// connect DB
connectDB();

// ✅ CORS with frontend URL from .env
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // serve uploaded images

app.get('/', (req, res) => res.send('RoomFinder API running'));

app.use('/api/auth', authRoutes);
app.use('/api/tenant-profile', TenantRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/allproperties", allPropertyRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/visits",visitRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
