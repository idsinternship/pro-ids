<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; text-align: center; }
        .box { border: 5px solid #000; padding: 40px; }
        h1 { font-size: 32px; }
        p { font-size: 18px; }
    </style>
</head>
<body>
    <div class="box">
        <h1>Certificate of Completion</h1>
        <p>This certifies that</p>
        <h2>{{ $user->name }}</h2>
        <p>has successfully completed</p>
        <h3>{{ $course->title }}</h3>
        <p>Date: {{ $certificate->issued_at }}</p>
        <p>Verification Code: {{ $certificate->code }}</p>
    </div>
</body>
</html>