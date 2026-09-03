import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import faqThinkingArt from '../../assets/faq-thinking-3d.png'
import { faqs } from '../../data/landingData'

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="mx-auto max-w-7xl px-5 py-18 lg:px-8 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_0.42fr] lg:gap-16">
        <div>
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Helpful context</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.055em] text-ink sm:text-5xl">Questions, answered plainly.</h2>
          </div>

          <div className="mt-10 divide-y divide-line border-y border-line">
            {faqs.map(({ question, answer }, index) => {
              const isOpen = index === openIndex
              return (
                <div key={question}>
                  <button type="button" className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-bold text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-forest" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    {question}
                    <ChevronDown className={`shrink-0 text-forest transition-transform ${isOpen ? 'rotate-180' : ''}`} size={20} aria-hidden="true" />
                  </button>
                  {isOpen && <p className="max-w-2xl pb-5 text-sm leading-6 text-muted">{answer}</p>}
                </div>
              )
            })}
          </div>
        </div>

        <figure className="visual-frame order-last mx-auto grid w-full max-w-52 place-items-center overflow-hidden rounded-3xl bg-mint p-4 sm:max-w-60 lg:max-w-[18rem] lg:p-5">
          <img src={faqThinkingArt} alt="3D character thinking beside question marks" className="h-auto w-full object-contain" />
        </figure>
      </div>
    </section>
  )
}

export default Faq
