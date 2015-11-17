'use strict';
let out = ''
    , headers = {}
    , status = 200;

const write = (input) => {
        if (typeof input === 'object') {
            out = JSON.stringify(input);
        } else {
            out = input;
        }
    }

    , show = () => {
        return {
            status: status
            , headers: headers
            , response: out
        };
    };


module.exports = {
    res: {
        send: write
        , end: write
        , setHeaders: (key, value) => {
              headers[key] = value;
          }
        , writeHead: (code, headersIn) => {
              status = code;
              headers = headersIn;
          }
    }
    , reset: () => {
          headers = {};
          status = 200;
          out = '';
      }
    , out: show
};
