const { QueryTypes } = require('sequelize');
module.exports = function(sequalize, DataTypes){
    var Apts = sequalize.define('Apts',{
        apt_id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey:true
        },
        User_id:{
            type: DataTypes.INTEGER,
        },
        apt_name:{
            type:DataTypes.STRING
        },
        apt_address:{
            type:DataTypes.STRING
        },
        price:{
            type: DataTypes.INTEGER,
        },
        lat:{
            type: DataTypes.DECIMAL(9,6),
        },
        lng:{
            type: DataTypes.DECIMAL(9,6),
        },
        available_till:{
            type:DataTypes.DATE
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
        }
    });
    Apts.get_near_by_apts = function(lat, lng, dist, callback){
        sequalize.query(
            'SELECT *, (3959 * acos (cos ( radians(:lat) )* cos( radians( lat ) )* cos( radians( lng ) - radians(:lat) )+ sin ( radians(:lat) )* sin( radians( lat ) ))) AS distance FROM Apts HAVING distance < :dist ORDER BY distance;',
            {
              replacements: { lat: lat,
                              lng:lng,
                            dist:dist },
              type: QueryTypes.SELECT
            }
          ).then(function(users) {
           callback(null, users)
        });;
    }
    return Apts;
}