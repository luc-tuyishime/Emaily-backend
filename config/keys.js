const { NODE_ENV: env } = process.env;

const config =
  env === 'production' ? require('./prod').default : require('./dev').default;

export default config;
