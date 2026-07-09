$proc = Start-Process -FilePath "node" -ArgumentList "D:\Kerja\GACS\apps\backend\dist\index.js" -PassThru -NoNewWindow
Start-Sleep -Seconds 3
$proc | Stop-Process -Force
Write-Host "Backend test completed"
