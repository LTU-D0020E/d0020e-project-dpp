import React, { useRef, useState, useEffect } from 'react'
import { QrScanner } from '@yudiel/react-qr-scanner'

export default function QRScannerComponent() {
  return (
    <>
      <QrScanner
        onDecode={result => console.log(result)}
        onError={error => console.log(error?.message)}
      />
    </>
  )
}
