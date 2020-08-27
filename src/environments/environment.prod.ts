import { version } from '../../package.json';

export const environment = {
  production: true,
  apiUrl: `/reward-program/api/v1`,
  refreshTokenMillis: 10,
  locale: "pt-PT",
  appVersion: version
};
