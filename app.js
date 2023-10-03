import express from "express";
import cors from 'cors';
import { getList, getGraph, createExpense,updateExpense,deleteExpense } from "./database.js";

const app = express()
app.use(express.json())

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))


app.get('/list', async (req,res) => {
    const data = await getList()
    res.send(data)
})

app.get('/graph/:id', async (req,res) => {
    const id = req.params.id
    const data = await getGraph(id)
    res.send(data)
})

app.post('/list', async (req,res) => {
    const {title, amount, date} = req.body
    const exp = await createExpense(title, amount, date)
    res.status(201).send(exp)
})

app.put('/list/:id', async (req,res) => {
    const id = req.params.id
    const {title, amount} = req.body
    const exp = await updateExpense(title, amount, id)
    res.send(exp)
})

app.delete('/list/:id', async (req,res) => {
    const id = req.params.id
    const exp = await deleteExpense(id)
    res.send(exp)
})

app.listen(8080, () => {
    console.log("Server is running on 8080");
})
