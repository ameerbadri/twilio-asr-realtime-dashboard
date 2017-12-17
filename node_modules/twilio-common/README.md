twilio-common.js
================

[![NPM](https://img.shields.io/npm/v/twilio-common.svg)](https://www.npmjs.com/package/twilio-common) [![Build Status](https://travis-ci.org/twilio/twilio-common.js.svg?branch=master)](https://travis-ci.org/twilio/twilio-common.js)

twilio-common.js contains functionality shared between Twilio SDKs, including
the Conversations and IP Messaging SDKs.

Including
---------

### CDN

Releases of twilio-common.js are hosted on a CDN, and you can include these
directly in your web app using a &lt;script&gt; tag.

```html
<script src="//media.twiliocdn.com/sdk/js/common/v0.1/twilio-common.min.js"></script>
```

### NPM & Bower

You can also include twilio-common.js with either [npm](https://www.npmjs.com)
or [bower](http://bower.io/). Including twilio-common.js this way allows you to
integrate flexibly with build systems like [Browserify](http://browserify.org)
and [webpack](https://webpack.github.io).

With npm:

```
npm install twilio-common --save
```

With bower:

```
bower install twilio-common --save
```

Building
--------

Fork and clone the repository. Then, install dependencies with

```
npm install
npm install gulp -g
```

Finally, run

```
gulp
```

The builds and docs will be placed in the `dist/` directory.


Contributing
------------

Bug fixes welcome! If you're not familiar with the GitHub pull
request/contribution process, [this is a nice tutorial](https://gun.io/blog/how-to-github-fork-branch-and-pull-request/).
