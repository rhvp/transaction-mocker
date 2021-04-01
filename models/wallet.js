module.exports = (sequelize, Sequelize) => {
    const Wallet = sequelize.define('wallet', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
    
        balance: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    })
  
    return Wallet;
  };