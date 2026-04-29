const express = require('express');
const app = express();
const port =  3000;

//set EJS
app.set('view engine', 'ejs');

//route
app.get('/', (req, res) => {
    res.render('index', {name:"Priyanka"});
});

app.listen(3000, () => {
    console.log(`server started at port ${port}`)
})