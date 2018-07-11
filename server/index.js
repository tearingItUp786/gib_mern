import http from 'http';
import app from './server';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
