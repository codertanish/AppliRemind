const express = require('express');
const path = require('path');
const app = express();
const APP_SCRIPT_URL = process.env.APP_SCRIPT_URL;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/submit-program', async (req, res) => {
  try {
    const payload = new URLSearchParams({
      email: req.body.email,
      programID: req.body.programID,
      delay: req.body.delay,
      deadline: req.body.deadline,
      url: req.body.url,
    });

    const response = await fetch(APP_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload,
    });

    const text = await response.text();
    console.log('Apps Script response:', text);

    res.send({ message: text });
  } catch (error) {
    console.error('Error forwarding to Apps Script:', error);
    res.status(500).json({ error: 'Submission failed' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
