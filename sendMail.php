<?php
$to = "arajithalher123@gmail.com";

$date = $_POST['selectedDate'];
$time = $_POST['selectedTime'];
$message = $_POST['message'];
$email = $_POST['email'];

$subject = "New Booking Request";

$body = "Booking Details:\n
Date: $date\n
Time: $time\n
Email: $email\n
Message: $message\n";

$headers = "From: $email";

mail($to, $subject, $body, $headers);

echo "Booking Successful! I will contact you soon.";
?>

