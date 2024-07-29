const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');
const appointmentsRouter = require('./routes/appointments');

app.use(cors());

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/appointments', appointmentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});