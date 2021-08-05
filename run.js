express = require('express')

const app = express()
const port = parseInt(process.argv[2] ?? 8000);

app.use('/public', express.static('public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
