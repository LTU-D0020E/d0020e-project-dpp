import LayoutGlobal from '@/components/Layout/LayoutGlobal'
import QRScanner from '@/components/UI/Forms/QRScanner'
import { Container } from '@/components/utils/Container'

export default function Scanner() {
  return (
    <LayoutGlobal>
      <Container>
        <QRScanner />
      </Container>
    </LayoutGlobal>
  )
}
