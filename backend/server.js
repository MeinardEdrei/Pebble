const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pebble')
.then( () => {
    console.log("mongo connected");
}).catch((e) => {
    console.error("error: ", e);
})

const itemSchema = new mongoose.Schema({
    input: String
});

const item = mongoose.model('item', itemSchema);
//schema: users and data items
//model: accounts, items

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is up');
})

app.post('/addNew', async (req, res) => {
    const { input } = req.body;
    const newItem = new item({ input });
    await newItem.save();
})

app.get('/contents', async (req, res) => {
    const items = await item.find();
    res.json(items); 
})

app.post('/removeItem', async (req, res) => {
    const { id } = req.body;
    await item.deleteOne({ _id: id });
})

app.post('/updateItem', async (req, res) => {
    const { id, editInput } = req.body;
    console.log(editInput + "- test");
    try {
        await item.updateOne({ _id: id }, { input: editInput });
        res.status(200).send({ message: 'Item updated successfully' });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).send({ message: 'Error updating item' });
    }
})




app.listen(3000, () => {
    console.log("listening to port 3000");
})