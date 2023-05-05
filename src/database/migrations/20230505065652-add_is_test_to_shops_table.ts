import { QueryInterface, DataTypes } from "sequelize";
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.addColumn('shops', 'is_test', {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },
  async down(queryInterface: QueryInterface) {
    await queryInterface.removeColumn('shops', 'is_test');
  }
};