import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import faqThinkingArt from '../../assets/faq-thinking-3d.png'
import { faqs } from '../../data/landingData'
import './Faq.css'

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  return (
    <section className="home-faq" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_0.42fr] lg:gap-16 lg:px-8">
        <div>
          <div className="faq-heading">
            <p>Questions</p>
            <h2 id="faq-heading">Answers, made<br /><em>easy to find.</em></h2>
          </div>

          <div className="faq-list">
            {faqs.map(({ question, answer }, index) => {
              const isOpen = index === openIndex
              return (
                <div key={question} className={isOpen ? 'is-open' : ''}>
                  <button type="button" onClick={() => setOpenIndex(isOpen ? -1 : index)} aria-expanded={isOpen}>
                    {question}
                    <ChevronDown size={20} aria-hidden="true" />
                  </button>
                  {isOpen && <p>{answer}</p>}
                </div>
              )
            })}
          </div>
        </div>

        <figure className="faq-art visual-frame">
          <span>Need a quick answer?</span>
          <img src={faqThinkingArt} alt="Character thinking beside question marks" width="720" height="720" loading="lazy" decoding="async" />
        </figure>
      </div>
    </section>
  )
}

export default Faq
