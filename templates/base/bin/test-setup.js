#!/usr/bin/env node
'use strict';

const dot = require('dot')
    , path = require('path');

dot.process({ path: path.join(process.cwd(), './templates') });
