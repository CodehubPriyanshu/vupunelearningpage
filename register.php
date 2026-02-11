<?php
session_start();
include('conn.php');

function clean($v) {
    return trim($v ?? "");
}

$data = [];

// Prioritize POST (modal form), else use SESSION
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = [
        "name" => clean($_POST['name']),
        "email" => clean($_POST['email']),
        "mobile" => clean($_POST['phone_no'] ?? $_POST['mobile'] ?? ""),
        "state" => clean($_POST['state']),
        "city" => clean($_POST['city']),
        "course" => clean($_POST['course']),
        "batch" => clean($_POST['batch']),
        "utm" => clean($_POST['utm_source_input'] ?? $_SESSION["utm_source_input"] ?? "")
    ];

} else {

    // data from session (main form)
    $data = [
        "name" => clean($_SESSION['name']),
        "email" => clean($_SESSION['email']),
        "mobile" => clean($_SESSION['mobile']),
        "state" => clean($_SESSION['state']),
        "city" => clean($_SESSION['city']),
        "course" => clean($_SESSION['course']),
        "batch" => clean($_SESSION['batch']),
        "utm" => clean($_SESSION['utm_source_input'])
    ];
}

// ---- STOP BLANK INSERTS ----
if (
    empty($data['name']) ||
    empty($data['email']) ||
    empty($data['mobile'])
) {
    header("Location: index.php");
    exit();
}

$uploadtime = date("Y-m-d H:i:s");
$sourse = "soundarya-university";

// ---- API DATA ----
$data_array = [
    "name" => $data["name"],
    "mobile" => $data["mobile"],
    "email" => $data["email"],
    "state" => $data["state"],
    "city" => $data["city"],
    "course" => $data["course"],
    "batch" => $data["batch"],
    "collegename" => "soundarya-university",
    "utm_source" => $data["utm"],
    "uploadtime" => $uploadtime
];

$data_string1 = json_encode($data_array);

// NeoDove API call
                    
$curl = curl_init('https://ee670195-f2b2-4f82-b71b-246857a0e1f6.neodove.com/integration/custom/231ee677-665e-4dfc-86af-daf053530519/leads');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $data_string1);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Content-Length: " . strlen($data_string1)
]);
$json_response = curl_exec($curl);
curl_close($curl);

// ---- INSERT INTO DATABASE ----
$sql = "INSERT INTO `user`
(`sourse`,`name`,`email`,`mobile`,`state`,`city`,`course`,`batch`,`status`,`created`,`utm_data`) 
VALUES (
    '$sourse',
    '{$data['name']}',
    '{$data['email']}',
    '{$data['mobile']}',
    '{$data['state']}',
    '{$data['city']}',
    '{$data['course']}',
    '{$data['batch']}',
    'application not submitted',
    '$uploadtime',
    '{$data['utm']}'
)";

$result = mysqli_query($conn, $sql);

if ($result) {

    session_unset();
    session_destroy();

    header("Location: https://vishwakarma-university.topuniversity.in/thanks.php");
    exit();

} else {
    echo "<script>alert('Database Error');location.replace('index.php');</script>";
}
?>
