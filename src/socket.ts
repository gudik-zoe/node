let io: any;

module.exports = {
  init: (httpServer: any) => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: '*',
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error('socket io not initialized');
    }
    return io;
  },
};
