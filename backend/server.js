const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const complaintRoutes = require('./routes/complaintRoutes');
const authRoutes = require('./routes/authRoutes');
const adminResetRoutes = require('./routes/adminResetRoutes');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 


app.use('/uploads', express.static('uploads'));

app.use('/api', complaintRoutes);
app.use('/api', adminResetRoutes);
app.use('/api', authRoutes);

// app.get('/api/test', (req, res) => {
//   res.send('Server is running....');
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
