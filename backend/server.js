const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');//done
const employeeRoutes = require('./routes/employeeRoutes');//done
const complaintRoutes = require('./routes/complaintRoutes'); // done
const adminComplaintRoutes = require('./routes/adminComplaintRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.use('/api', authRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminComplaintRoutes);


// app.get('/api/test', (req, res) => {
//   res.send('Server is running....');
// });

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
