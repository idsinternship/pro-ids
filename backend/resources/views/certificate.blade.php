<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate of Completion</title>
    <style>
        body {
            font-family: DejaVu Sans, sans-serif;
            text-align: center;
            padding: 80px;
        }
        .title {
            font-size: 36px;
            font-weight: bold;
        }
        .name {
            font-size: 28px;
            margin: 40px 0;
        }
        .course {
            font-size: 22px;
        }
        .date {
            margin-top: 60px;
            font-size: 14px;
        }
        .border {
            border: 6px solid #000;
            padding: 60px;
        }
    </style>
</head>
<body>
    <div class="border">
        <div class="title">Certificate of Completion</div>

        <p>This certifies that</p>

        <div class="name">{{ $student }}</div>

        <p>has successfully completed</p>

        <div class="course">{{ $course }}</div>

        <div class="date">
            Issued on {{ $issued_at }}
        </div>
    </div>
</body>
</html>