module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define('transaction', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        amount: {
            type: Sequelize.FLOAT,
            allowNull: false
        },

        type: {
            type: Sequelize.ENUM,
            values: ['credit', 'debit'],
            allowNull: false
        },

        status: {
            type: Sequelize.ENUM,
            values: ['success', 'failed'],
            allowNull: false
        }

    })

    return Transaction;
};