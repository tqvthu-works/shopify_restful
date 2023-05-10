import { STATUS } from '@constant/common';
export interface IResult<D = any> {
    status: boolean;
    data: D;
}
export type TStatus = (typeof STATUS)[keyof typeof STATUS];
