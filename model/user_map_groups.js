
module.exports = function(sequalize, DataTypes){
    var Users = sequalize.define('user_map_groups',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        user_id:{
            type: DataTypes.INTEGER,
        },
        group_id:{
            type: DataTypes.INTEGER,
        },
        is_active:{
            type:DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false 
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