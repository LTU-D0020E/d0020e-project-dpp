import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { BrowserView, MobileView } from 'react-device-detect'
import { useRouter } from 'next/router'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Example for a named export, replace `NamedComponent` with the actual export name
const QrScanner = dynamic(
  () =>
    import('@yudiel/react-qr-scanner').then(mod => ({
      default: mod.QrScanner,
    })),
  { ssr: false }
)

export default function Scanner() {
  const router = useRouter()

  // Handle the decoded result
  const handleDecode = result => {
    try {
      const obj = JSON.parse(result) // Assuming result is a JSON string
      const oid = obj?._id?.$oid // Extract the oid
      if (oid) {
        router.push(`/product/${oid}`) // Navigate to the specific product page
      } else {
        console.error('OID not found in the scanned result')
      }
    } catch (error) {
      console.error('Error parsing QR code result:', error)
    }
  }

  return (
    <LayoutGlobal>
      <Container>
        <MobileView>
          <div className='flex flex-col items-center justify-center pt-4'>
            <div className='w-full'>
              <QrScanner
                onDecode={handleDecode}
                onError={error => console.log(error?.message)}
                audio={false}
              />
            </div>
          </div>
        </MobileView>
        <BrowserView>
          <h1>To scan a QR code please open on mobile</h1>
        </BrowserView>
      </Container>
    </LayoutGlobal>
  )
}
