const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/',(req,res) =>{
    res.send('Hello NODE API')
})

app.get('/blog',(req,res) =>{
    res.send('Hello Blog')
})

app.get('/products', async(req, res)=>{
    try{
        const products = await Product.findById({});
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res)=>{
    try {
        const{id} = req.params;
        const product = await Product.find(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products',async(req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);

    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

//update the product
app.put('/products/:id',async(req,res)=> {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);


    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete a product

app.delete('/products/:id' , async(req,res) =>{
    try {
        const{id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message:`found nothing with ID ${id}`})
        }
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery" , false)
mongoose.connect('mongodb+srv://admin:admin2008@cluster0.ztgl4o1.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, ()=> {
        console.log(`connected to MongoDB`)
    });
    console.log(`connected`)
}).catch(() => {
    console.log(error)
})