
		<?php
          require'SMTP.php';
		  require 'PHPMailer.php';
		   header('Content-Type: application/json');
			
      	   //getting clients details
           $name = $_POST["name"];
		   $organisation =  $_POST["organisation"];
		   $email = $_POST["email"];
		   $message = $_POST["message"];

			//initilizing mailer object
	        $mail = new PHPMailer(); // create a new object
			$mail->IsSMTP(); // enable SMTP
			$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
			$mail->SMTPAuth = true; // authentication enabled
			$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
			$mail->Host = "md-in-19.webhostbox.net";
			$mail->Port = 465; // or 587
			$mail->IsHTML(true);
			$mail->Username = "noreply@dreamlogic.in";
			$mail->Password = "Dreaml0g1c@mail";
			$mail->SetFrom("noreply@dreamlogic.in");
			$mail->Subject = "Password reset link";
			$mail->Body = "<h4>Name: ". $name  . "</h4>"
			$mail->AddAddress("amarentp.goa@gmail.com"); 

			

		?>
