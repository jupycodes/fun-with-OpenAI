const express = require('express')
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname + '/frontend'));

app.post('/api', async (request, response) => {
  const api_key = process.env.API_KEY
  const engine = request.body.engine
  const url = `https://api.openai.com/v1/engines/${engine}/completions`
  const data = {
    prompt: request.body.prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
   };
   const apiResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`,
      },
    body: JSON.stringify(data)
   })
   const result = await apiResponse.json()
   response.send(result.choices[0].text)
})


  app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
}); 