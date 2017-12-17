0.1.7
=====

New Features
------------

- Added support for React Native

0.1.6
=====

New Features
------------

- Added a new event, "tokenWillExpire", to AccessManager; this event is raised
  up to three minutes before the Access Token's expiration time.

0.1.5
=====

New Features
------------

- Added support for platforms that do not have a native Promise implementation,
  e.g. Internet Explorer 11.

0.1.4
=====

Bug Fixes
---------

- Fixed a bug in AccessManager where Unicode identities were sometimes decoded
  incorrectly.
