<!DOCTYPE html>
<html>
<head>
    <title>New Job Posted</title>
</head>
<body>
    <h2>A new job has been posted on JobSphere!</h2>
    <p><strong>Title:</strong> {{ $job->title }}</p>
    <p><strong>Description:</strong> {{ $job->description }}</p>
    <p><strong>Company:</strong> {{ $job->company_name }}</p>
    <p>Visit the JobSphere site for more details.</p>
</body>
</html>
