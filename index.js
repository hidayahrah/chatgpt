const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const configuration = new Configuration({
  organization: process.env.CHAGPT_ORG,
  apiKey: process.env.CHAGPT_APIKEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;

  const response = await openai.createCompletion({
    model: `${currentModel}`,//text-davinci-003
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});


app.get("/models", async (req, res) => {
    const response = await openai.listEngines();
    res.json({
      models: response.data.data,
    });
  });

app.listen(port, () => {
  console.log(`Listening at PORT:${port}`);
});
