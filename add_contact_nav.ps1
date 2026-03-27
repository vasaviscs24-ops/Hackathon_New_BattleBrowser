$files = Get-ChildItem "c:\Users\vasav\OneDrive\Desktop\BMSCE BROWSER BATTLE\*.html" | Where-Object { $_.Name -ne "contact.html" }
$added = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -notmatch 'href="contact\.html"') {
        $content = $content -replace '(<li><a href="admissions\.html"[^>]*>Admissions</a></li>)', '$1
            <li><a href="contact.html">Contact</a></li>'
        Set-Content $file.FullName $content -Encoding UTF8
        Write-Host "Added Contact to: $($file.Name)"
        $added++
    } else {
        Write-Host "Already has Contact: $($file.Name)"
    }
}
Write-Host "Done. Added Contact link to $added files."
