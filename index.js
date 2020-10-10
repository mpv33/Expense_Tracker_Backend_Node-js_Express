const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const http = require('http');
const port = 8000;
const db = require('./config/mongoose');
const expense = require('./models/expense_data');

app.use(bodyParser());
app.use((req, res, next) => {
  const allowedOrigins = '*';
  const origin = req.headers.origin;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', false);
  return next();
});

app.get('/', async  (req, res) => {

  const expenses = await expense.find({});

  try {
    res.send(expenses);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }

});

app.post('/expenses', async (req, res) => {
  const exp = new expense(req.body);
  try {
    await exp.save();
    res.send(exp);
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
});

app.put('/expenses/:id', async (req, res) => {
  try {
    const exp = await expense.findByIdAndUpdate(req.params.id, req.body)
    await exp.save()
    res.send(exp)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.delete('/delete/:id', async (req, res) => {
  try {
    const exp = await expense.findByIdAndDelete(req.params.id)

    if (!exp) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
