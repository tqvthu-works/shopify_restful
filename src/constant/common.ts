import status from 'http-status';
export const HTTP_STATUS_CODE = status;

export const STATUS = {
    ACTIVATED: 'activated',
    INACTIVATED: 'inactivated',
    DELETED: 'deleted',
    SOFT_DELETED: 'soft_deleted',
} as const;
