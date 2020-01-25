var User_groups = {};
var models = require("../model");

User_groups.add = function(req, res){
    models.User_groups.create(req.body).then(data=>{
        if(!data){
            res.send("error occurred");
        } else {
            res.send("success",200);
        }
    });
}

module.exports = User_groups;