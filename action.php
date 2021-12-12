<!--
    References:
        1) https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js
        2) https://cdn.JsDelivr.net/gh/bmoren/p5.collide2D/p5.collide2d.min.js
-->

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <title>AHKYQX-FinalProject-F21</title>

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="style.css" />
        
        <!-- import p5 things -->
        <?php
            $actionType = empty($_GET['actionType']) ? $_POST["actionType"] : $_GET["actionType"];

            if ($actionType == "password") {
                $username = empty($_POST["username"]) ? "None" : $_POST["username"];
                $password = empty($_POST["password"]) ? "None" : $_POST["password"];

                if ($username == "test" && $password == "pass") {
                    echo "<script src='https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js'></script>";
                    echo "<script src='https://cdn.JsDelivr.net/gh/bmoren/p5.collide2D/p5.collide2d.min.js'></script>";
                }
            }
        ?>

        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="script.js" defer></script>
    </head>

    <body>
        <div id="header">
            <?php
                $actionType = empty($_GET['actionType']) ? $_POST["actionType"] : $_GET["actionType"];

                if ($actionType == "password") {
                    $username = empty($_POST["username"]) ? "None" : $_POST["username"];
                    $password = empty($_POST["password"]) ? "None" : $_POST["password"];

                    if ($username == "test" && $password == "pass") {
                        echo "<div class='d-flex'>";
                            echo "<h1 class='header-elements mr-auto'>You are now logged into Breakout!</h1>";
                            echo "<div class='btn-group p-2' id='buttons' role='group' aria-label='Buttons'>";
                                echo "<button type='button' class='header-elements btn btn-primary btn-secondary' id='reload'>
                                    Try again?</button>";
                                echo "<a href='index.html' class='btn btn-danger btn-secondary' id='logout'>Logout</a>";
                            echo "</div>";
                        echo "</div>";
                    }
                    else {
                        echo "<h1>Invalid credentials</h1>";
                        echo "<a href='index.html'>Click here to go back.</a>";
                    }
                }
            ?>
        </div>  
    </body>
</html>
