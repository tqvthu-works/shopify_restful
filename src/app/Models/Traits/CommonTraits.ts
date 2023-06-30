import { Op, WhereOptions } from 'sequelize';
export const paginate = <M>(
    sortField: keyof M,
    isUnique = true,
    direction: 'desc' | 'asc',
    cursor: string,
    perPage: number
): any => {
    const orders = [];
    const input = JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
    let where: any = {};
    orders.push([sortField, direction]);
    if (isUnique) {
        where = { [sortField]: { [Op.lt]: input[sortField] } };
    } else {
        orders.push(['id', direction]);
        where = {
            [Op.or]: [
                { [sortField]: { [Op.lt]: input[sortField] } },
                {
                    [sortField]: input[sortField],
                    [sortField]: { [Op.lt]: input[sortField] }
                }
            ]
        };
    }
    return {
        where: where,
        order: orders
    };
};
