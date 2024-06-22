const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { translate } = require('@vitalets/google-translate-api');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve your static files

// Route to handle translation
app.post('/translate', (req, res) => {
    const { text, targetLang } = req.body;
    translate(text, { to: targetLang })
        .then(response => {
            res.send({ translatedText: response.text });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send("Error in translation");
        });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
