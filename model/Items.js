
module.exports = function(sequalize, DataTypes){
    var Items = sequalize.define('Items',{
        item_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        user_id:{
            type:DataTypes.STRING
        },
        item_name:{
            type:DataTypes.STRING
        },
        item_link:{
            type:DataTypes.STRING
        },
        item_type:{
            type:DataTypes.STRING
        },
        caption:{
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
    },{
        classMethods: {
            get_items_by_group : function(group_id, callback){
                sequelize.query('select * from users u inner join items i on u.user_id=i.user_id inner join user_map_groups umg on u.user_id=umg.user_id where umg.group_id=:group_id;',
                    { replacements: { group_id: group_id }, type: sequelize.QueryTypes.SELECT }
                ).then(items_data => {
                    callback(err, items_data);
                });
            }
        },
        tableName: 'customers',
        timestamps: true,
        underscored: true
    });
    return Items;
}