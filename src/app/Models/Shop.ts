import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../../database/index';
import { injectable } from 'inversify';
import { paginate } from '@app/Models/Traits/CommonTraits';
import { TStatus } from '@contract/common';

export interface ShopAttributes {
    id: number;
    name: string | null;
    shopify_domain: string;
    domain: string | null;
    owner: string | null;
    email: string | null;
    phone: string | null;
    timezone: string | null;
    country: string | null;
    currency: string | null;
    access_token: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    money_format: string | null;
    money_with_currency_format: string | null;
    uninstalled_at: Date | null;
    plan_name: string | null;
    status: TStatus;
    is_test?: boolean;
}

export type ShopCreationAttributes = Optional<
    ShopAttributes,
    'id' | 'created_at' | 'updated_at'
>;
@injectable()
export class Shop
    extends Model<ShopAttributes, ShopCreationAttributes>
    implements ShopAttributes
{
    public static readonly FREE_PLAN = 'free';
    public static readonly NEW_INSTALL_APP = 'new_install';
    public static readonly REINSTALL_APP = 're_install';
    public static readonly ACTIVE_APP = 'active';

    public id: number;
    public name: string;
    public shopify_domain: string;
    public domain: string | null;
    public owner: string | null;
    public email: string | null;
    public phone: string | null;
    public timezone: string | null;
    public country: string | null;
    public currency: string | null;
    public access_token: string | null;
    public theme_id: number | null;
    public storefront_access_token: string | null;
    public money_format: string | null;
    public money_with_currency_format: string | null;
    public uninstalled_at: Date | null;
    public plan_name: string | null;
    public status: TStatus;
    public is_test: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

Shop.init(
    {
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
            type: DataTypes.NUMBER,
            allowNull: true,
        },
        is_test: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
    },
    {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'Shop', // We need to choose the model name,
        tableName: 'shops',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        scopes: {
            paginate,
        },
    },
);
