<!DOCTYPE html>
<html>
  <head>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <meta charset="utf-8">
    <title></title>
    <!--[if lt IE 9]>
        <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
        <![endif]-->
    <script>
      // relies on Date.now() which has been supported everywhere modern for years.
      // as Safari 6 doesn't have support for NavigationTiming, we use a Date.now() timestamp for relative values
      // if you want values similar to what you'd get with real perf.now, place this towards the head of the page
      // but in reality, you're just getting the delta between now() calls, so it's not terribly important where it's placed
      (function(){
      // prepare base perf object
      if (typeof window.performance === 'undefined') {
      window.performance = {};
      }
      if (!window.performance.now){
      var nowOffset = Date.now();
      if (performance.timing && performance.timing.navigationStart){
      nowOffset = performance.timing.navigationStart
      }
      window.performance.now = function now(){
      return Date.now() - nowOffset;
      }
      }
      })();
    </script>
    <style>
      body {
      margin: 0;
      padding: 0;
      background: #000000;
      }
      #gameContainer {
      width: 100%;
      height: 100%;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      }
      .game {
      width: 100%;
      background: #000000;
      background: -moz-linear-gradient(top, #000000 0%, #000000 50%, #3d0100 100%);
      background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#000000), color-stop(50%,#000000), color-stop(100%,#3d0100));
      background: -webkit-linear-gradient(top, #000000 0%,#000000 50%,#3d0100 100%);
      background: -o-linear-gradient(top, #000000 0%,#000000 50%,#3d0100 100%);
      background: -ms-linear-gradient(top, #000000 0%,#000000 50%,#3d0100 100%);
      background: linear-gradient(to bottom, #000000 0%,#000000 50%,#3d0100 100%);
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#000000', endColorstr='#3d0100',GradientType=0 );
      }
    </style>
  </head>
  <body>
    <div id="gameContainer"></div>
    <script src="js/build/client.js"></script>
    <script type="text/javascript">
      <!--
          // refer server response
          var main = new RRLL("http://localhost:8080/level");
          main.start();
        -->
    </script>
    <script src="js/jquery-2.1.4.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <a href="https://github.com/szk/rrll"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"></a>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-62802781-1', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>
