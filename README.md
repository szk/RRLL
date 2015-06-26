# RudeRogueLikeLike
Roguelike game on HTML5. [LIVEDEMO](http://szk.github.io/RRLL/dist/)  
**IMPORTANT: Early version, this is not playable as a game.**

## Current features
- Isometric view
- Spine animation
- Simple Client-Server model (Express + Socket.io + Redis)
- Multiplatform (on HTML5/WebGL compliant browsers)  
More > [RRLL Wiki](https://github.com/szk/RRLL/wiki/)

## How to build / play on your computer
Clone master branch or [download archive](https://github.com/szk/RRLL/archive/master.zip) and extract it.

### For building
1. Install Node.js and NPM.
1. Type from command prompt:

    <!-- language: sh -->
        $ npm install
        $ grunt build

### For playing
1. Type from command prompt:

    <!-- language: sh -->
        $ npm start
1. Access ```http://localhost:8080/``` with web browser (IE 11+, FF 15+, Chrome 11+, Safari 5.1+, Opera 19+).

## License
[MIT License](http://opensource.org/licenses/MIT)
