import 'dotenv/config';
import './websocket.js';
import { serverHttp } from './server.js';

const port = process.env.PORT;

serverHttp.listen(port, () =>
  console.log('Server up and running on port', port)
);
