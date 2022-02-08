module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        address: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING(20)
        }
    }, {
        tableName: "users",
        timestamps: true,
    })

    return User;
};