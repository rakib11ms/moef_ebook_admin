<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>User Registration</title>
</head>
<body>
    <form method="POST" action="{{ route('register') }}">
        @csrf
        <div>
            <label for="UserName">User Name:</label>
            <input type="text" name="UserName" id="UserName" required>
        </div>
        <div>
            <label for="userPhone">User Phone:</label>
            <input type="tel" name="userPhone" id="userPhone" required>
        </div>
        <div>
            <label for="userEmail">User Email:</label>
            <input type="email" name="userEmail" id="userEmail" required>
        </div>
        <div>
            <label for="OfficeID">Office ID:</label>
            <input type="text" name="OfficeID" id="OfficeID">
        </div>
        <div>
            <label for="userPassword">Password:</label>
            <input type="password" name="userPassword" id="userPassword" required>
        </div>
        <div>
            <label for="userPassword">Confirm Password:</label>
            <input type="password" name="userPassword_confirmation" id="userPassword_confirmation" required>
        </div>
        <div>
            <button type="submit">Register</button>
        </div>
    </form>
</body>
</html>
