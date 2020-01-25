var Items = {};
var models = require("../model");
var stream = require("stream");
const _ = require("lodash");

Items.add=(req, res)=>{
    let body = {
        item_type: req.file.mimetype,
        item_name: req.file.originalname,
        img: req.file.buffer,
        user_id: req.body.user_id,
        is_active: req.body.is_active
      }

    models.Users.findOne({
        where:{
            user_id: req.body.user_id
        }
    }).then(data=>{
        if(data){
            console.log(data.dataValues.item_count)
            if(data.dataValues.data_size_uploaded+req.file.size<20000000 && data.dataValues.item_count<20){
                models.Items.create(body).then(() => {
                    res.send('File uploaded successfully! -> filename = ' + req.file.originalname);
                });
                models.Users.update({data_size_uploaded: (data.dataValues.data_size_uploaded+req.file.size),
                    item_count: (data.dataValues.item_count+1)},
                    {where: {user_id:req.body.user_id}}).then(data=>{
                        if(!data){
                            console.log("error updating user file size");
                        }
                    });
            } else {
                res.send("User upload size exceeded!!", 401);
            }
        }
    });
}

Items.get=(req, res)=>{
    models.Items.findOne({ where:{
        item_id:req.query.id
        }
    }).then(file => { 
        var fileContents = Buffer.from(file.img, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);
        
        res.set('Content-disposition', 'attachment; filename=' + file.item_name);
        res.set('Content-Type', file.item_type);
       
        readStream.pipe(res);
      })
}
Items.get_item_by_group = function(req, res){
    models.Items.get_item_by_group(req.query.group_id, (err, data)=>{
        if(err){
            res.send(err);
        } else {
            res.send(data.dataValues);
        }
    });
}
module.exports = Items;