import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
import { BrowserView, MobileView } from 'react-device-detect'
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
  return (
    <LayoutGlobal>
      <Container>
        <MobileView>
          <div className='flex flex-col items-center justify-center pt-4'>
            <div className='w-2/5'>
              <QrScanner
                onDecode={result => console.log(result)}
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
