
module.exports = function(sequalize, DataTypes){
    var Images = sequalize.define('Images',{
        image_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        apt_id:{
            type:DataTypes.STRING
        },
        img:{
            type: DataTypes.BLOB('long'),
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
    return Images;
}