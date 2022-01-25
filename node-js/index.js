const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const cryptoJs = require('crypto-js')
const app = express();
app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
});




const iv  = cryptoJs.enc.Hex.parse('be410fea41df7162a679875ec131cf2c');
const secretKey = 'Secret Passphrase API'
const secretKeyApp = 'Secret Passphrase'

app.post('/', (req, res) => {
  const {data} = req.body
  var text = 'Respuesta del API cifrado'
  console.log({data});


  const encrypted  = cryptoJs.AES.encrypt(text, secretKey, 
    {
      iv,
      mode: cryptoJs.mode.CBC,
      padding: cryptoJs.pad.Pkcs7
  });

  const decrypted  = cryptoJs.AES.decrypt(data, secretKeyApp, {
    iv,
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7
  });
  
  res.json({
    encrypted: encrypted.toString(), 
    decrypted: decrypted.toString(cryptoJs.enc.Utf8)})
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000! open http://localhost:8000')
});