[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$dir = "c:\Users\Lenovo\Desktop\ahaaq-auto\car 3-2006 Acura tl"
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()

Get-ChildItem -Path $dir -Filter "*.jpeg" | ForEach-Object {
    $filePath = $_.FullName
    $asyncOp = [Windows.Storage.StorageFile]::GetFileFromPathAsync($filePath)
    $asyncOp.AsTask().Wait()
    $file = $asyncOp.GetResults()

    $asyncOp2 = $file.OpenReadAsync()
    $asyncOp2.AsTask().Wait()
    $stream = $asyncOp2.GetResults()

    $asyncOp3 = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
    $asyncOp3.AsTask().Wait()
    $decoder = $asyncOp3.GetResults()

    $asyncOp4 = $decoder.GetSoftwareBitmapAsync()
    $asyncOp4.AsTask().Wait()
    $softwareBitmap = $asyncOp4.GetResults()

    $asyncOp5 = $engine.RecognizeAsync($softwareBitmap)
    $asyncOp5.AsTask().Wait()
    $res = $asyncOp5.GetResults()

    if ($res.Text) {
        Write-Output ("`n=== " + $_.Name + " ===")
        Write-Output $res.Text
    }
}
