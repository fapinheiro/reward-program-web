import { version } from '../../package.json';

export const environment = {
  production: true,
  apiUrl: `${window.location.hostname}:${window.location.port}/api`,
  refreshTokenMillis: 10,
  locale: "pt-PT",
  appVersion: version
};
