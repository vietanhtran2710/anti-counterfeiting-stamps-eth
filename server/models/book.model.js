module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("book", {
        code: {
            type: DataTypes.STRING(10),
            primaryKey: true
        },
        serialNumber: {
            type: DataTypes.STRING(40)
        },
        name: {
            type: DataTypes.STRING(100)
        },
    }, {
        tableName: "books",
        timestamps: true,
    })

    return Book;
};