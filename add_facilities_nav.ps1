$files = Get-ChildItem "c:\Users\vasav\OneDrive\Desktop\BMSCE BROWSER BATTLE\*.html" | Where-Object { $_.Name -ne "facilities.html" }
$added = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -notmatch 'href="facilities\.html"') {
        # Insert Facilities link before Admissions
        $content = $content -replace '(<li><a href="admissions\.html"[^>]*>Admissions</a></li>)', '<li><a href="facilities.html">Facilities</a></li>
            $1'
        Set-Content $file.FullName $content -Encoding UTF8
        Write-Host "Added Facilities to: $($file.Name)"
        $added++
    } else {
        Write-Host "Already has Facilities: $($file.Name)"
    }
}
Write-Host "Done. Added Facilities link to $added files."
