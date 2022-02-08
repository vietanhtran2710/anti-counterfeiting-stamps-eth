module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        code: {
            type: DataTypes.STRING(50),
            primaryKey: true
        },
        serialNumber: {
            type: DataTypes.STRING(50)
        },
        name: {
            type: DataTypes.STRING(100)
        },
        transaction: {
            type: DataTypes.STRING(300)
        }
    }, {
        tableName: "books",
        timestamps: true,
    })

    return Book;
};