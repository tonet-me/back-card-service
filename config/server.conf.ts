export default () => ({
  port: parseInt(process.env.PORT, 10) || 5052,
  host: process.env.HOST || 'localhost',
  env: process.env.ENV || 'development',
});
