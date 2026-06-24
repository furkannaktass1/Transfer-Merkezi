$port = 8080
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
    Write-Host "Server started successfully."
    Write-Host "Local web server is running on: http://localhost:$port"
    Write-Host "Press Ctrl+C to stop..."
    
    # Otomatik olarak tarayıcıyı aç
    Start-Process "http://localhost:$port"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestUrl = $context.Request.Url.LocalPath
        if ($requestUrl -eq "/") { $requestUrl = "/index.html" }
        
        # Dizin traversal ataklarını önlemek için basit koruma
        $requestUrl = $requestUrl.TrimStart("/")
        $filePath = Join-Path -Path $PWD -ChildPath $requestUrl

        $response = $context.Response
        
        if (Test-Path $filePath -PathType Leaf) {
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            
            if ($filePath -match '\.html$') { $response.ContentType = "text/html; charset=utf-8" }
            elseif ($filePath -match '\.css$') { $response.ContentType = "text/css" }
            elseif ($filePath -match '\.js$') { $response.ContentType = "application/javascript" }
            elseif ($filePath -match '\.png$') { $response.ContentType = "image/png" }
            elseif ($filePath -match '\.svg$') { $response.ContentType = "image/svg+xml" }
            
            try {
                $response.OutputStream.Write($content, 0, $content.Length)
            } catch {}
            $response.StatusCode = 200
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
} catch {
    Write-Host "Error starting server: $_"
} finally {
    if ($listener.IsListening) { $listener.Stop() }
}
