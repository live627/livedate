# livedate [![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/live627/livedate.svg?branch=master)](https://travis-ci.org/live627/livedate) [![Code Climate](https://codeclimate.com/github/live627/livedate/badges/gpa.svg)](https://codeclimate.com/github/live627/livedate) [![Support](https://supporter.60devs.com/api/b/axlsj1o8o0amepfrr5eqlcjza)](https://supporter.60devs.com/give/axlsj1o8o0amepfrr5eqlcjza)

Visual date picker script. Very compact at under 2KB minified and gzipped.

**Demo**: http://live627.github.io/livedate

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install livedate --save
```

## Usage
```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <title>Livedate by live627</title>
    <link rel="stylesheet" href="dateinput.css">
  </head>
  <body>
    <input type="text" id="date">

    <script src="dateinput.min.js"></script>
    <script>
      var
        days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        daysShort = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
        months = ['January','February','March','April','May','June','July','August','September','October','November','December'],
        monthsShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
       new Livedate(document.getElementById('date'));
    </script>

  </body>
</html>
```

## Tests

```sh
npm install
npm test
```

## Build

`npm install` to grab all the dependenceies<br>
`npm run build` uglify and minify JS, compile SASS into CSS and minify it

## Dependencies

None

## Goals
My goals with this script are:
- to keep it as lean and readable as possible
- to NOT have jQuery as a dependency

## Dev Dependencies

- [mkdirp](https://github.com/substack/node-mkdirp): Recursively mkdir, like `mkdir -p`
- [node-sass](https://github.com/sass/node-sass): Wrapper around libsass
- [watch](https://github.com/mikeal/watch): Utilities for watching file trees.

## Sources
This work is based on [jQuery Tools Dateinput](http://jquerytools.github.io/documentation/dateinput/index.html).


## TODO

- Use the scroll wheel to change months.
- Build tests
