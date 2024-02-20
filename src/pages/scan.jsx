import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import { Container } from '@/components/utils/Container'
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
        <QrScanner
          onDecode={result => console.log(result)}
          onError={error => console.log(error?.message)}
          audio={false}
        />
      </Container>
    </LayoutGlobal>
  )
}
