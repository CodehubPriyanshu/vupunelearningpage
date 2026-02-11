<?php session_start();

#$con = mysqli_connect("localhost","my_user","my_password","my_db");
$conn = mysqli_connect("localhost","zjyosduo_soundarya","soundarya@123","zjyosduo_soundarya");
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}else{
    //	echo "<script>alert('connected');</script>";
}
?>