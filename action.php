<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="style.css" />
        <script src="script.js"></script>
        <title>AHKYQX-FinalProject-F21</title>
    </head>
    <body>
        <?php
            $actionType = empty($_GET['actionType']) ? $_POST["actionType"] : $_GET["actionType"];

            if ($actionType == "password") {
                $username = empty($_POST["username"]) ? "None" : $_POST["username"];
                $password = empty($_POST["password"]) ? "None" : $_POST["password"];

                if ($username == "test" && $password == "pass") {
                    echo "<h1>You are now logged in.</h1>";
                    echo "<a href='index.html'>Click here to logout.</a>";
                }
                else {
                    echo "<h1>Invalid credentials</h1>";
                    echo "<a href='index.html'>Click here to go back.</a>";
                }
            }
        ?>

        
    </body>
</html>
