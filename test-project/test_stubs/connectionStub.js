'use strict';

let out = '',
    forward = '',
    headers = {},
    status = 200,
    done;

const write = (input) => {
        if (typeof input === 'object') {
          out = JSON.stringify(input);
        } else {
          out = input;
        }

        if (done) {
          done();
        }
      },

      show = () => {
        return {
          status: status,
          headers: headers,
          response: out,
          forward: forward
        };
      };


module.exports = {
  res: {
    send: write,
    end: write,
    setHeaders: (key, value) => {
      headers[key] = value;
    },
    writeHead: (code, headersIn) => {
      status = code;
      headers = headersIn;
    },
    redirect: (url) => {
      forward = url;

      if (done) {
        done();
      }
    }
  },
  req: {
    headers: {}
  },
  reset: () => {
    headers = {};
    status = 200;
    out = '';
    forward = '';
    done = null;
  },
  out: show,
  done: (cb) => {
    done = cb;
  }
};
