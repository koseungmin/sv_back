const environments = {
    development : {
        mysql: {
          username : 'root',
          password : 'root',
          database : 'sv'
        }
    },


    production: {
        mysql: {
          username : 'root',
          password : 'root',
          database : 'sv'
        }
    }
}


const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];
