$proj = "C:\atari-monk\Code\user\"
$folder = "auth-lib\build\"
$pack = "auth-lib-1.0.0.tgz"
$lib = $proj + $folder + $pack

npm i
npm run build
Set-Location build
npm pack

$userApp = $proj + "user-app\"
Copy-Item $lib $userApp
Set-Location $userApp
npm i (Get-Item $pack).Name
