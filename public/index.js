document.getElementById('btnTrans').addEventListener('click', function () {
    const originalText = document.getElementById('original').value;
    const targetLang = 'vi'; // Set your target language code

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: originalText, targetLang })
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('translated-google').value = data.translatedText;
        })
        .catch(error => {
            console.error('Error:', error)
            document.getElementById('translated-google').value = "Translation Service Error (Too many requests)";
        });

    fetch('http://localhost:5555/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: originalText })
    })
    .then(response => response.json())
    .then(data => {
            document.getElementById('translated-machine').value = data.translation;
    })
    .catch(error => console.error('Error:', error));
});
