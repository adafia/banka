const express = require('express');
const path = require('path');
const app = express();

// Set a static folder
app.use(express.static(path.join(__dirname, '../ui')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));