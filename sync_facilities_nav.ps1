$files = Get-ChildItem "c:\Users\vasav\OneDrive\Desktop\BMSCE BROWSER BATTLE\*.html"

foreach ($file in $files) {
    if ($file.Name -eq "facilities.html") { continue }
    
    $content = Get-Content $file.FullName -Raw
    # Update Facilities link in navbar
    # Look for <li><a href="facilities-hospital.html" ...>Facilities</a></li> or similar
    # or just <li><a href="facilities-hospital.html">Facilities</a></li>
    $pattern = '<li><a href="facilities-hospital.html"(.*?)>Facilities</a></li>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, '<li><a href="facilities.html"$1>Facilities</a></li>'
    } else {
        # Fallback for other potential variations
        $pattern2 = '<li><a href="facilities-counselling.html"(.*?)>Facilities</a></li>'
        $content = $content -replace $pattern2, '<li><a href="facilities.html"$1>Facilities</a></li>'
    }
    
    Set-Content $file.FullName $content
    Write-Host "Updated $($file.Name)"
}
