<?php

if($_POST["submit"]) {
    
    
    $mailTo = "shubhambhardwaj142@gmail.com";
    $name=$_POST["name"];
    $phone=$_POST["phone"];
    $sender=$_POST["mail"];
    $message=$_POST["message"];

    $headers = "From: ".$sender;
    $txt = "You have received an e-mail from ".$name.".\n\n".$message;

    mail($mailTo, $subject, $txt, $headers);
    header("Location: contact.php?mailsent");   
}

?>