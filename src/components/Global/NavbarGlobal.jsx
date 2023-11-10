import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import { Container } from '../utils/Container'

export function Header(props) {
  const router = useRouter()
  return (
    <header className={twMerge('z-[150]', props.navClassName)}>
      <nav>
        <Container></Container>
      </nav>
    </header>
  )
}
