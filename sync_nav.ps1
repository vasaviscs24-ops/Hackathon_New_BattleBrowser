$newDropdown = @'
            <li class="dropdown"><a href="#">Academics</a>
                <div class="dropdown-content">
                    <a href="academics-cse.html">Computer Science</a>
                    <a href="academics-aiml.html">AI & Machine Learning</a>
                    <a href="academics-ece.html">Electronics & Communication</a>
                    <a href="academics-mechanical.html">Mechanical Engineering</a>
                    <a href="academics-civil.html">Civil Engineering</a>
                    <a href="academics-chemical.html">Chemical Engineering</a>
                    <a href="academics-biotech.html">Biotechnology</a>
                    <a href="academics-maths.html">Mathematics</a>
                    <a href="academics-physics.html">Physics</a>
                    <a href="academics-chemistry.html">Chemistry</a>
                </div>
            </li>
'@

$files = Get-ChildItem "c:\Users\vasav\OneDrive\Desktop\BMSCE BROWSER BATTLE\*.html"

foreach ($file in $files) {
    if ($file.Name -like "academics-*") { continue } # Already handled in creation or needs special 'active' class
    
    $content = Get-Content $file.FullName -Raw
    # Pattern to match the Academics dropdown block
    $pattern = '(?s)<li class="dropdown"><a href="#">Academics</a>.*?</li>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, $newDropdown
        Set-Content $file.FullName $content
        Write-Host "Updated $($file.Name)"
    }
}
