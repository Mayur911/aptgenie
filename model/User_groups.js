module.exports = function(sequalize, DataTypes){
    var Users = sequalize.define('User_groups',{
        group_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        group_name:{
            type:DataTypes.STRING
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
    });
    return Users;
}