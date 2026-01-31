<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: DejaVu Sans; text-align: center; }
        h1 { margin-top: 100px; }
    </style>
</head>
<body>
    <h1>Certificate of Completion</h1>

    <p>This certifies that</p>
    <h2>{{ $user->name }}</h2>

    <p>has successfully completed</p>
    <h3>{{ $course->title }}</h3>

    <p>Verification Code:</p>
    <strong>{{ $certificate->verification_code }}</strong>
</body>
</html>