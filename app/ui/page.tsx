import { Button } from '../../components/UI'
/* eslint-disable import/no-default-export */

export default function UI() {
  return (
    <main>
      <section className="p-5">
        <h4 className="text-2xl text-white mb-4">Icons</h4>
        <div className="flex items-center gap-5">
          <i className="icon-logout text-lg text-white"></i>
          <i className="icon-discord text-lg text-white"></i>
          <i className="icon-bell text-lg text-white"></i>
          <i className="icon-twitter text-lg text-white"></i>
          <i className="icon-coin text-lg text-white"></i>
          <i className="icon-cog text-lg text-white"></i>
          <i className="icon-medium text-lg text-white"></i>
          <i className="icon-link text-lg text-white"></i>
          <i className="icon-clock text-lg text-white"></i>
          <i className="icon-wallet text-lg text-white"></i>
          <i className="icon-git text-lg text-white"></i>
          <i className="icon-x text-lg text-white"></i>
          <i className="icon-unplug text-lg text-white"></i>
          <i className="icon-loading text-lg text-white"></i>
          <i className="icon-document text-lg text-white"></i>
          <i className="icon-telegram text-lg text-white"></i>
          <i className="icon-chevron text-lg text-white"></i>
          <i className="icon-reflesh text-lg text-white"></i>
        </div>
      </section>
      <section className="p-5">
        <h4 className="text-2xl text-white mb-4">Button</h4>
        <div className="flex items-center gap-5">
          <Button variant="default">Default</Button>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
        </div>
      </section>
    </main>
  )
}
