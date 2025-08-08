const express = require('express');
const path = require('path');
const app = express();
const APP_SCRIPT_URL = process.env.APP_SCRIPT_URL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/config', (req, res) => {
res.json({
  scriptURL: APP_SCRIPT_URL,
  password: ADMIN_PASSWORD
});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});