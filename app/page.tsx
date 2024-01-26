/* eslint-disable import/no-default-export */
import Header from "@/components/Layout/Header"
import WalletSelection from '@/components/Modals/WalletSelection'


export default function Home() {
  return (
    <main>
      <div className="p-5">
        <Header />
        <WalletSelection />
      </div>
    </main>
  )
}
