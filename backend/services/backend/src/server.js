require('dotenv').config();
const app = require('./app');

const port = process.env.PORT;

app.listen(port, () => console.log(`🚀 Server running on port: ${port}`)); 