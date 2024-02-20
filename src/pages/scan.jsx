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
  // State to hold the decoded result
  const [decodedResult, setDecodedResult] = useState('')

  // Handle the decoded result
  const handleDecode = result => {
    console.log(result)
    setDecodedResult(result) // Update state with the decoded result
  }

  return (
    <div className='flex flex-col items-center justify-center pt-4'>
      <div className='w-full'>
        <QrScanner
          onDecode={handleDecode}
          onError={error => console.log(error?.message)}
          audio={false}
        />
      </div>
      {/* Input box to display the decoded result */}
      <div className='mt-4 w-full'>
        <input
          type='text'
          className='form-input mt-1 block w-full'
          value={decodedResult} // Display the decoded result here
          onChange={e => setDecodedResult(e.target.value)} // Allows editing the result if needed
          placeholder='Decoded QR code result'
        />
      </div>
    </div>
  )
}
