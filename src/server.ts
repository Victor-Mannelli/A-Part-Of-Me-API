import 'dotenv/config';
import { app, init } from './app';
// import './websocket.ts';
// import { serverHttp } from './server.ts';

const port = process.env.PORT;

// serverHttp.listen(port, () =>
//   console.log('Server up and running on port', port)
// );
init().then(() => {
  app.listen(port, () => console.log('Server up and running on port', port));
});
