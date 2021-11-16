const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();

app.get('/', async(req, res, next) => {
    try {
        client.on("error", function(error) {
            console.error(error);
        });

        client.set("key", "berhasil", redis.print);
        client.get("key", (err, data) => {
            if(err){
                res.status(402).json({ message: err });
            }
            res.status(200).json({ data });
        });
    } catch(err) {
        res.status(401).json({ message: 'an error has occured in the server' });
    }
});

app.listen(3000, () => {
    console.log('server start listening at port 3000');
})