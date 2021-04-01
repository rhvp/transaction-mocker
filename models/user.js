module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
    
        firstName: {
            type: Sequelize.STRING,
        },
    
        lastName: {
            type: Sequelize.STRING,
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
    
        phone: {
            type: Sequelize.STRING,
        },
    
        image: Sequelize.STRING,
    
    })

    User.prototype.toJSON =  function () {
        var values = Object.assign({}, this.get());
      
        delete values.password;
        return values;
      }
  
    return User;
};