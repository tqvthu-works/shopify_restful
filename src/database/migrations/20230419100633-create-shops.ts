import { QueryInterface, DataTypes } from "sequelize";
export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('shops', {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      shopify_domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      timezone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      access_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      money_format: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      money_with_currency_format: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      uninstalled_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      plan_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('shops');
  }
};




