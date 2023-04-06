import 'dotenv/config';
import { app } from './server';
// import './websocket.ts';
// import { serverHttp } from './server.ts';

const port = process.env.PORT;

// serverHttp.listen(port, () =>
//   console.log('Server up and running on port', port)
// );

app.listen(port, () => console.log('Server up and running on port', port));