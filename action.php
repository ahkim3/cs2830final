<!DOCTYPE html>

<html>
<head>
    <title>Action</title>
</head>
<body>

    <?php

        $actionType = empty($_GET['actionType']) ? $_POST["actionType"] : $_GET["actionType"];

        if ($actionType == "name") {
            $firstname = empty($_GET["firstname"]) ? "None" : $_GET["firstname"];
            $lastname = empty($_GET["lastname"]) ? "None" : $_GET["lastname"];

            echo "Hello, " . $firstname . " " . $lastname;
        }

        elseif ($actionType == "password") {
            $username = empty($_POST["username"]) ? "None" : $_POST["username"];
            $password = empty($_POST["password"]) ? "None" : $_POST["password"];

            if ($username == "test" && $password == "pass") {
                echo "<h1>Credentials validated with POST</h1>";
            }
            else {
                echo "<h1>Invalid credentials</h1>";
            }
        }

    ?>


</body>
</html>
