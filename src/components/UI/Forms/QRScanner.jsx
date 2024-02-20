import React, { useRef, useState, useEffect } from 'react'
import jsQR from 'jsqr-es6'

const QRScanner = () => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    // Access the user's webcam
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      })
      .catch(err => console.error('Error accessing the webcam:', err))

    // Scan for QR codes
    const scanningInterval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d')
        const width = videoRef.current.videoWidth
        const height = videoRef.current.videoHeight
        if (width && height) {
          canvasRef.current.width = width
          canvasRef.current.height = height
          context.drawImage(videoRef.current, 0, 0, width, height)
          const imageData = context.getImageData(0, 0, width, height)
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: 'dontInvert',
          })
          if (code) {
            setQrCode(code.data)
            clearInterval(scanningInterval) // Stop scanning after the first QR code is found
          }
        }
      }
    }, 100) // Scan every 100 milliseconds

    return () => {
      return () => {
        clearInterval(scanningInterval)
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }}></video>

      <canvas ref={canvasRef} style={{ width: '100%' }}></canvas>
      {qrCode && <p>QR Code Detected: {qrCode}</p>}
    </div>
  )
}

export default QRScanner
