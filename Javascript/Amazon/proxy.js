import tunnel from 'tunnel';
 
const tunnelingAgent = tunnel.httpsOverHttp({
  proxy: {
    host: 'localhost',
    port: 3128
  }
});
 
const req = https.request({
  host: 'example.com',
  port: 443,
  agent: tunnelingAgent
});

