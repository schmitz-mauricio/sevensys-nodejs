import { QueryInterface } from 'sequelize';


export = {
  up: (queryInterface: QueryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Products',
        'stock',
        {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
      );
  },

  down: (queryInterface: QueryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'Products',
        'stock'
      );
  }
};
