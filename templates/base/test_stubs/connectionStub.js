'use strict';
const write = function (input) {
        if(typeof input === 'object'){
            out = JSON.stringify(input);
        } else {
            out = input;
        }
    }

    , show = function () {
        return {
            status: status
            , headers: headers
            , response: out
        };
    };

let out = ''
    , headers = {}
    , status = 200;

module.exports = {
            res: {
                send: write
                , end: write
                , setHeaders: (key, value) => {
                    headers[key] = value;
                }
                , writeHead: (code, headersIn) => {
                    status = code;
                    headers = headersIn
                }
            }
            , reset: () => {
                headers = {};
                status = 200;
                out = '';
            }
            , out: show
        };
