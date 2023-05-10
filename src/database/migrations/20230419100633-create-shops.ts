import { QueryInterface, DataTypes } from 'sequelize';
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('shops', {
            id: {
                type: DataTypes.BIGINT.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            shopify_domain: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            domain: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            owner: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            phone: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            timezone: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: true,
            },
            currency: {
                type: DataTypes.STRING(25),
                allowNull: true,
            },
            access_token: {
                type: DataTypes.STRING(100),
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
                type: DataTypes.STRING(250),
                allowNull: true,
            },
            money_with_currency_format: {
                type: DataTypes.STRING(250),
                allowNull: true,
            },
            uninstalled_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            plan_name: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING(50),
                allowNull: true,
                
            },
        });
    },
    async down(queryInterface): Promise<void> {
        await queryInterface.dropTable('shops');
    },
};
