const express = require('express');
const path = require('path');

let app = express();

const PORT = process.env.PORT || 3000;

app.use('/dist', express.static('dist'));

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'), (err) => {
        if (err){
            res.status(500).send(err)
        }
    })
})


app.listen(PORT, function(){
    console.log('Express server is up on port' + PORT);
});
