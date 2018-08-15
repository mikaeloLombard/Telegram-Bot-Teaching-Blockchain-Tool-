var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')

app.use(bodyParser.json()) // for parsing application/json
app.use(
  bodyParser.urlencoded({
    extended: true
  })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
  const { message } = req.body

  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.text.toLowerCase().indexOf('hello') < 0) {
    // In case a message is not present, or if our message does not have the word hello in it, do nothing and return an empty response
    return res.end()
  }

  // If we've gotten this far, it means that we have received a message containing the word "hello".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the sentences "Hello, I am Prof. TERN Welcome to Ternio Academy!"
  // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"
  axios
    .post(
      'https://api.telegram.org/bot<your_tokenhere>/sendMessage',
      {
        chat_id: message.chat.id,
        text: 'Hello, I am Prof. TERN \n  Welcome to Ternio Academy!'
      }
    )
    .then(response => {
      // We get here if the message was successfully posted
      console.log('Message posted')
      res.end('ok')
    })
    .catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
})

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!')
})
