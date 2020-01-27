<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Pizza`s</title>

        <!-- Fonts -->
        <link href="//fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link href="/css/app.css" rel="stylesheet" type="text/css">

        <!-- NavBar -->
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/"><h1>Pizza`s</h1></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link" href="/" id="home"><h3>Home</h3><span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/pizza" id="menu"><h3>Menu</h3></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/order" id="orders"><h3>Orders</h3></a>
                </li>
                <li class="nav-item">
                  <button type="button" class="btn btn-info" href="/cart" id="button_cart" onclick="window.location='/cart'">
                    <h3> Your Cart </h3>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

    </head>
    <body>
        <div id="example"></div>

       <script src="/js/app.js"></script>
    </body>
</html>
