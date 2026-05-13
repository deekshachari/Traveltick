const apiKey = "AIzaSyCUiSjNOOtRHgcVL17J-rljGX_xYes0J0A";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

const requestBody = {
  contents: [{
    role: 'user',
    parts: [{ text: "Hello" }]
  }]
};

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(requestBody)
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
