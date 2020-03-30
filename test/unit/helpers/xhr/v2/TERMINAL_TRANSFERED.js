const data = {
  "status": 200,
  "responseType": "json",
  "response": {
    "version":"1.0.0",
    "stateHandle":"01OCl7uyAUC4CUqHsObI9bvFiq01cRFgbnpJQ1bz82",
    "terminal":{
       "type":"object",
       "value":{
          "name":"terminal-transfered",
          "message":{
             "message":"Flow continued in a new tab.",
             "i18n":{
                "key":"idx.session.expired",
                "params":[

                ]
             }
          }
       }
    },
    "factor":{
       "type":"object",
       "value":{
          "factorType":"email",
          "provider":"okta",
          "profile":{
             "email":"o*****m@abbott.dev"
          }
       }
    }
 }
};
module.exports = data;
