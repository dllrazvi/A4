module.exports = {
    mongodb: {
      url: 'mongodb://localhost:27017/MPP',
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    migrationsDir: 'migrations',
  };