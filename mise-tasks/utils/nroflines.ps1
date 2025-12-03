#!/usr/bin/env pwsh
#MISE description="Gets the number of lines of TypeScript code in the project"

$ErrorActionPreference = "Stop"

# Get all TypeScript files and count their lines
$files = @(fd -Iitf -e ts -e tsx -E node_modules)
Write-Output "Found $($files.Count) TypeScript files"

$nroflines = 0
foreach ($file in $files) {
    $lineCount = (Get-Content $file -Raw | Measure-Object -Line).Lines
    $nroflines += $lineCount
}

Write-Output "Lines of TypeScript powering this website: $nroflines"

# Set in mise environment for local development
mise set NEXT_PUBLIC_NUMBER_OF_LINES="$nroflines"

# Export to GitHub Actions environment for subsequent steps
if ($env:GITHUB_ENV) {
    Add-Content -Path $env:GITHUB_ENV -Value "NEXT_PUBLIC_NUMBER_OF_LINES=$nroflines"
    Write-Output "Exported to GitHub Actions: NEXT_PUBLIC_NUMBER_OF_LINES=$nroflines"
}
