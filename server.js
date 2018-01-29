const fs = require('fs');
const express = require('express');

// let rawdata = fs.readFileSync('person-tree.json');  
// let student = JSON.parse(rawdata);  
// console.log(student); 

fs.readFile('src/person-tree.json', (err, data) => {  
    if (err) {
        throw err;
    }
    let student = JSON.parse(data);
    console.log(student);
});

const app = express();
app.use(express.static('public'));
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));