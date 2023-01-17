const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()
const port = 3006

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/read', (req, res) => {
    res.send(readData('data.txt'))
})


const readData = fileName => {
    let data = fs.readFileSync(fileName)
    // console.log(data);
    data = data.toString()
    // data = data.replaceAll('"', '')
    // data = data.replaceAll('{', '')
    // data = data.replaceAll('}', '')
    return data
}

app.post('/add', (req, res) => {
    const data = JSON.parse(readData('data.txt'))
    let addText = { ...data, ...req.body }
    fs.writeFileSync('data.txt', JSON.stringify(addText))
    res.send(addText)
})


app.patch('/replace', (req, res) => {
    const data = JSON.parse(readData('data.txt'))
    let addText = { ...data, ...req.body }
    fs.writeFileSync('data.txt', JSON.stringify(addText))
    res.send(addText)
})

app.delete('/delete', (req, res) => {
    fs.rmSync('./data.txt')
    res.send("ok")
})