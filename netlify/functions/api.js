import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const api = require('./api.cjs');

export const handler = api.handler;
export default handler;
