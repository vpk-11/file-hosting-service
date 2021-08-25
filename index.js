const express = require('express');
const upload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const dir = './uploads';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir, {
		recursive: true
	});
}

const app = express();

app.use(upload());

app.get('/',(req,res) => {
    res.sendFile(__dirname + '/dfw_ost-pic.html');
});

app.post('/', (req,res) =>{
    if(req.files){
        console.log(req.files);
        let file = req.files.file;
        let filename = file.name;
        let type = file.mimetype;
        console.log(filename);
       // file.name = 'image.png';
        console.log(type);
        let time = new Date().getTime();
        console.log(time);
        filename = time + 'image.png';
        console.log(filename);

        file.mv(path.join(__dirname, 'uploads', filename), (err) =>{
            if (err){
                res.send(err);
            } else{
                res.send('File Uploaded');
                app.use('/uploads', express.static(path.join(__dirname,'static')));

                app.get('/images', (req,res)=>{
                res.sendFile(path.join(__dirname, 'uploads' , filename));
});
            }
        });
    }
})

// file.mimetype

app.listen(5000);