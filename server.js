const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const formData = req.body;
    console.log('Form Data Received:', formData);

    // Respond with a success message
    res.json({ message: 'Formulario enviado exitosamente', data: formData });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});