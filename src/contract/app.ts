import { APP_ENVS } from '@constant/app';

export type TAppEnv = (typeof APP_ENVS)[keyof typeof APP_ENVS];
