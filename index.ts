import Api from './api';
import * as  http from 'http'
import Logger from './common/logger'

const port = 5000;
const logger = new Logger();

Api.set('port', port);
const server = http.createServer(Api);
server.listen(port);


server.on('listening', () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`)
 });

module.exports = Api;