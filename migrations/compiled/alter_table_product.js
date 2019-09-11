"use strict";
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.addColumn('Products', 'stock', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.removeColumn('Products', 'stock');
    }
};
