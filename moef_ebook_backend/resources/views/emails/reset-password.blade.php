<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>Reset Password</h1>
    <p>Please click the following link to reset your password:</p>
    @component('mail::button', ['url' => 'http://localhost:3000/change-password-confirm/'.$resetLink])
Click to verify
@endcomponent


</body>
</html>