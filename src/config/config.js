import dotenv from 'dotenv';
dotenv.config();

const config = {
  general : {
    port: process.env.PORT || 4000
  }
};

export default config;