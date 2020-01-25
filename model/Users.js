var passwordHash = require('password-hash');
module.exports = function(sequalize, DataTypes){
    var Users = sequalize.define('Users',{
        user_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        user_name:{
            type:DataTypes.STRING
        },
        user_password:{
            type:DataTypes.STRING
        },
        login_name:{
            type:DataTypes.STRING
        },
        user_email:{
            type: DataTypes.STRING,
            validate: {isEmail: {msg: "Enter Valid Email"}}
        },
        contact_number:{
            type: DataTypes.INTEGER,
            validate: {
                len: {args: [10, 10], msg: "Improper Phone Number"},
                isNumeric: {
                  msg: "Improper Phone Number"
                },
                notEmpty: true
            }
        },
        is_admin:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        is_requested:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
    }, {
        hooks: {
          beforeCreate: (user) => {
            user.user_password = passwordHash.generate(user.user_password);
          }
        },
        validPassword: function(user_password, table_user_password) {
                return passwordHash.verify(user_password, table_user_password);
          }
    });
    return Users;
}