Add-Type -AssemblyName System.Runtime.WindowsRuntime
$asTaskGeneric = [System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1

function Await($asyncOp, $type) {
    $asTask = $asTaskGeneric.MakeGenericMethod($type)
    $netTask = $asTask.Invoke($null, @($asyncOp))
    $netTask.Wait()
    return $netTask.Result
}

[Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null
[Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime] | Out-Null

$dir = "c:\Users\Lenovo\Desktop\ahaaq-auto\car 4-2012 ford escape xlt clean 3900"
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromUserProfileLanguages()

Get-ChildItem -Path $dir -Filter "*.jpeg" | ForEach-Object {
    try {
        $filePath = $_.FullName
        $asyncOp1 = [Windows.Storage.StorageFile]::GetFileFromPathAsync($filePath)
        $file = Await $asyncOp1 ([Windows.Storage.StorageFile])

        $asyncOp2 = $file.OpenReadAsync()
        $stream = Await $asyncOp2 ([Windows.Storage.Streams.IRandomAccessStreamWithContentType])

        $asyncOp3 = [Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)
        $decoder = Await $asyncOp3 ([Windows.Graphics.Imaging.BitmapDecoder])

        $asyncOp4 = $decoder.GetSoftwareBitmapAsync()
        $softwareBitmap = Await $asyncOp4 ([Windows.Graphics.Imaging.SoftwareBitmap])

        $asyncOp5 = $engine.RecognizeAsync($softwareBitmap)
        $res = Await $asyncOp5 ([Windows.Media.Ocr.OcrResult])

        if ($res.Text) {
            Write-Output ("`n=== " + $_.Name + " ===")
            Write-Output $res.Text
        }
    } catch {
        Write-Output ("Error on " + $_.Name + ": " + $_.Exception.Message)
    }
}
