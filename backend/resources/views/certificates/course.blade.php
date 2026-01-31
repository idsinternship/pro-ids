<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Course Certificate</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            text-align: center;
            padding: 60px;
        }
        .container {
            border: 6px solid #111;
            padding: 60px;
        }
        h1 {
            font-size: 42px;
            margin-bottom: 20px;
        }
        h2 {
            font-size: 28px;
            margin: 30px 0;
        }
        p {
            font-size: 18px;
        }
        .footer {
            margin-top: 60px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Certificate of Completion</h1>

        <p>This certifies that</p>

        <h2>{{ $student }}</h2>

        <p>has successfully completed the course</p>

        <h2>{{ $course }}</h2>

        <p>Issued on {{ $issued_at }}</p>

        <div class="footer">
            © {{ date('Y') }} {{ config('app.name') }}
        </div>
    </div>
</body>
</html>