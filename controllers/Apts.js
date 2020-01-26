var Apts = {};
var models = require("../model");
const _ = require("lodash");

Apts.addApts = function(req, res){
    const { files } = req;
    let obj = {
        User_id:req.body.User_id,
        apt_name:req.body.apt_name,
        apt_address:req.body.apt_address,
        price:req.body.price,
        lat:req.body.lat,
        lng:req.body.lng,
        available_till:req.body.available_till
    }
    models.Apts.create(obj)
    .then(apts => {
        _.forEach(files,(image)=>{
            let write = {
                apt_id:apts.dataValues.apt_id,
                img : image.buffer,
                is_active:1
            }
            models.Images.create(write).then(data=>{
                if(!data){
                    res.send("err", 400);
                }
            });
        });
        res.send("success", 200);
    })
    .catch(error => {
        res.send(error);
    });
}
Apts.get= function (req, res){
    console.log(req.query.lang);
    let result = models.Apts.get_near_by_apts(req.query.lat,req.query.lng, req.query.distance, function(err, Users){
        if(!res){
            console.log("error occurred!");
        } else {
            res.send(Users,200);     
        }
    });
}

module.exports  = Apts;