const apiKey = "AIzaSyCbV_LIz4KYluft25JgyqyHVNgYe-13JqE";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
.then(res => res.json())
.then(data => {
  const models = data.models.filter(m => m.supportedGenerationMethods.includes('generateContent'));
  console.log(models.map(m => m.name));
})
.catch(err => console.error(err));
