var Users = {};
var models = require("../model");
const _ = require("lodash");

Users.getUserDetails= (req, res)=>{
        res.send("Hello!!!");
}
Users.addUser = function(req, res){
    const { groups } = req.body;
    models.Users.create(req.body)
    .then(user => {
        _.forEach(groups,(group_id)=>{
            let write = {
                user_id:user.dataValues.user_id,
                group_id: group_id,
                is_active:1
            }
            models.user_map_groups.create(write).then(data=>{
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
Users.login = function(req, res){
        models.Users.findOne({ where: { user_email: req.body.user_email } }).then(function (user) {
            if (!user) {
                res.send('User Not Found!', 400);
            } else if (!user._modelOptions.validPassword(req.body.user_password, user.dataValues.user_password)) {
                res.send('Invalid Password',400);
            } else {
                req.session ={user : user.dataValues};
                res.json(user.dataValues, 200);
            }
        });
}
 module.exports = Users;