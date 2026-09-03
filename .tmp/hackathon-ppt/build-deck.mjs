import fs from 'node:fs/promises'
import { Presentation, PresentationFile } from '@oai/artifact-tool'

const OUT = 'C:/Users/mak22/Desktop/mediTrust/mediTrust_NEXHACK_2_0_Intro.pptx'
const ROOT = 'C:/Users/mak22/Desktop/mediTrust'
const ASSETS = `${ROOT}/src/assets`

const C = {
  ink: '#09234A',
  blue: '#1768D8',
  canvas: '#F6F9FF',
  sand: '#EAF0FB',
  line: '#CAD8ED',
  muted: '#526783',
  coral: '#F47B61',
  mint: '#DFF4FF',
  white: '#FFFFFF',
}

async function image(path) {
  const bytes = await fs.readFile(path)
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}

function box(slide, x, y, w, h, fill, radius = 'rounded-xl', line = 'none') {
  const config = {
    geometry: radius === 'none' ? 'rect' : 'roundRect',
    position: { left: x, top: y, width: w, height: h },
    fill,
    line: line === 'none' ? { style: 'solid', fill: 'none', width: 0 } : { style: 'solid', fill: line, width: 1 },
  }
  if (radius !== 'none') config.borderRadius = radius
  return slide.shapes.add(config)
}

function text(slide, value, x, y, w, h, style = {}) {
  const shape = slide.shapes.add({
    geometry: 'textbox',
    position: { left: x, top: y, width: w, height: h },
    fill: 'none',
    line: { style: 'solid', fill: 'none', width: 0 },
  })
  shape.text = value
  shape.text.style = {
    fontSize: style.fontSize || 18,
    color: style.color || C.ink,
    bold: style.bold || false,
    alignment: style.alignment || 'left',
    verticalAlignment: style.verticalAlignment || 'middle',
    lineSpacing: style.lineSpacing || 1,
  }
  return shape
}

function rule(slide, x, y, w, color = C.line, height = 1) {
  box(slide, x, y, w, height, color, 'none')
}

function imageContain(slide, bytes, alt, x, y, w, h) {
  slide.images.add({
    blob: bytes,
    contentType: 'image/png',
    alt,
    fit: 'contain',
    position: { left: x, top: y, width: w, height: h },
  })
}

function footer(slide, page, dark = false) {
  const col = dark ? '#B8D9FF' : C.muted
  text(slide, 'mediTrust  •  NEXHACK 2.0', 72, 681, 330, 18, { fontSize: 12, color: col, bold: true })
  text(slide, String(page).padStart(2, '0'), 1160, 681, 48, 18, { fontSize: 12, color: col, bold: true, alignment: 'right' })
}

function eyebrow(slide, value, x = 72, y = 56, color = C.blue) {
  text(slide, value.toUpperCase(), x, y, 420, 22, { fontSize: 13, color, bold: true })
}

async function main() {
  const [logo, hero, guide, verify, feedback, faq] = await Promise.all([
    image(`${ASSETS}/meditrust-logo.png`),
    image(`${ASSETS}/hero-medical-wayfinder.png`),
    image(`${ASSETS}/guide-robot.png`),
    image(`${ASSETS}/verification-3d.png`),
    image(`${ASSETS}/feedback-3d.png`),
    image(`${ASSETS}/faq-thinking-3d.png`),
  ])

  const deck = Presentation.create({ slideSize: { width: 1280, height: 720 } })

  // Slide 1 — team intro
  {
    const s = deck.slides.add()
    s.background.fill = C.ink
    box(s, 0, 0, 1280, 720, C.ink, 'none')
    box(s, 790, -90, 620, 620, '#12396C', 'rounded-xl')
    box(s, 1010, 410, 330, 330, C.coral, 'rounded-xl')
    imageContain(s, logo, 'mediTrust logo', 72, 54, 118, 78)
    text(s, 'NEXHACK 2.0', 72, 170, 250, 26, { fontSize: 15, color: '#B8D9FF', bold: true })
    text(s, 'mediTrust', 72, 212, 615, 78, { fontSize: 76, color: C.white, bold: true, lineSpacing: 0.9 })
    text(s, 'Care discovery, made clearer.', 72, 304, 550, 42, { fontSize: 29, color: '#DFF4FF' })
    rule(s, 72, 388, 350, '#74A4E9', 2)
    text(s, 'Team', 72, 420, 110, 26, { fontSize: 16, color: '#B8D9FF', bold: true })
    text(s, 'Adnan Khan  •  Tushar Soni', 72, 454, 520, 36, { fontSize: 25, color: C.white, bold: true })
    text(s, 'A thoughtful doctor-discovery experience for people navigating care in a city that may still feel unfamiliar.', 72, 521, 535, 66, { fontSize: 20, color: '#D8E6F8', lineSpacing: 1.12 })
    imageContain(s, hero, '3D medical location marker', 740, 122, 470, 470)
    text(s, 'INTRODUCTION DECK', 950, 633, 255, 22, { fontSize: 13, color: C.white, bold: true, alignment: 'right' })
    footer(s, 1, true)
  }

  // Slide 2 — problem
  {
    const s = deck.slides.add()
    s.background.fill = C.canvas
    eyebrow(s, 'The starting point')
    text(s, 'Finding the right doctor\nshould not feel like a guess.', 72, 96, 690, 116, { fontSize: 52, color: C.ink, bold: true, lineSpacing: 0.92 })
    text(s, 'When care is needed, people often need clarity first — about which speciality to explore, where a doctor practises, and what is actually available.', 72, 236, 655, 72, { fontSize: 22, color: C.muted, lineSpacing: 1.12 })
    // gentle structure and the product image
    box(s, 776, 70, 432, 528, C.mint, 'rounded-xl')
    imageContain(s, guide, '3D guidance assistant', 820, 103, 345, 382)
    text(s, 'A calmer starting point\nfor a high-stakes choice.', 810, 490, 365, 56, { fontSize: 22, color: C.ink, bold: true, alignment: 'center', lineSpacing: 0.96 })
    const issues = [
      ['01', 'Scattered information', 'Details can live across multiple places.'],
      ['02', 'Unclear availability', 'Schedules and appointment methods matter.'],
      ['03', 'Hard to compare', 'People need consistent profile information.'],
    ]
    issues.forEach(([num, heading, detail], i) => {
      const y = 360 + i * 82
      text(s, num, 72, y, 46, 28, { fontSize: 16, color: C.blue, bold: true })
      text(s, heading, 132, y, 250, 28, { fontSize: 20, color: C.ink, bold: true })
      text(s, detail, 132, y + 30, 485, 24, { fontSize: 16, color: C.muted })
      if (i < issues.length - 1) rule(s, 132, y + 67, 500)
    })
    footer(s, 2)
  }

  // Slide 3 — solution
  {
    const s = deck.slides.add()
    s.background.fill = C.ink
    box(s, 0, 0, 1280, 720, C.ink, 'none')
    box(s, 738, 0, 542, 720, '#0E315E', 'none')
    eyebrow(s, 'The mediTrust approach', 72, 58, '#B8D9FF')
    text(s, 'One clear place\nto explore care options.', 72, 106, 610, 125, { fontSize: 56, color: C.white, bold: true, lineSpacing: 0.9 })
    text(s, 'mediTrust brings practical doctor information into a calmer discovery experience — with clear profiles, locations, schedules, and feedback.', 72, 265, 565, 82, { fontSize: 22, color: '#D8E6F8', lineSpacing: 1.1 })
    rule(s, 72, 391, 500, '#477DBA', 1)
    text(s, 'Built to support discovery — never to replace medical advice.', 72, 420, 530, 35, { fontSize: 20, color: '#DFF4FF', bold: true })
    text(s, 'The experience helps users begin with information they can understand and compare.', 72, 470, 515, 54, { fontSize: 18, color: '#B8D9FF', lineSpacing: 1.1 })
    imageContain(s, hero, '3D medical location marker', 760, 105, 430, 430)
    box(s, 815, 546, 330, 75, C.white, 'rounded-xl')
    text(s, 'Clarity first. Care next.', 838, 565, 285, 32, { fontSize: 22, color: C.ink, bold: true, alignment: 'center' })
    footer(s, 3, true)
  }

  // Slide 4 — user journey flow
  {
    const s = deck.slides.add()
    s.background.fill = C.canvas
    eyebrow(s, 'How it works')
    text(s, 'A simple journey from question\nto a clearer next step.', 72, 94, 800, 110, { fontSize: 48, color: C.ink, bold: true, lineSpacing: 0.92 })
    text(s, 'A focused flow keeps the choice understandable without pretending to make the decision for the user.', 72, 223, 750, 52, { fontSize: 20, color: C.muted })
    // arrows are added first so they stay behind the journey steps
    const xs = [88, 358, 628, 898]
    for (let i = 0; i < 3; i += 1) {
      const arrow = s.shapes.add({ geometry: 'rightArrow', position: { left: xs[i] + 174, top: 434, width: 65, height: 28 }, fill: C.line, line: { style: 'solid', fill: 'none', width: 0 } })
      arrow.opacity = 1
    }
    const steps = [
      ['01', 'Start with a city', 'Choose location and speciality — or ask for guidance.'],
      ['02', 'Explore profiles', 'See consistent professional details in one place.'],
      ['03', 'Compare practical fit', 'Review schedules, locations and appointment options.'],
      ['04', 'Take the next step', 'Call, get directions, or return to compare.'],
    ]
    steps.forEach(([n, title, detail], i) => {
      const x = xs[i]
      box(s, x, 358, 205, 205, C.white, 'rounded-xl', C.line)
      box(s, x + 21, 382, 43, 35, i === 0 ? C.coral : C.mint, 'rounded-xl')
      text(s, n, x + 21, 386, 43, 26, { fontSize: 14, color: i === 0 ? C.white : C.blue, bold: true, alignment: 'center' })
      text(s, title, x + 21, 440, 170, 40, { fontSize: 21, color: C.ink, bold: true, lineSpacing: 0.95 })
      text(s, detail, x + 21, 492, 165, 48, { fontSize: 15, color: C.muted, lineSpacing: 1.08 })
    })
    imageContain(s, faq, '3D question mark illustration', 1000, 78, 180, 180)
    footer(s, 4)
  }

  // Slide 5 — practical information
  {
    const s = deck.slides.add()
    s.background.fill = C.canvas
    eyebrow(s, 'What makes the experience useful')
    text(s, 'Designed around\npractical information.', 72, 96, 570, 112, { fontSize: 52, color: C.ink, bold: true, lineSpacing: 0.9 })
    text(s, 'The product focuses on information people can actually use while deciding whom to contact.', 72, 232, 560, 55, { fontSize: 20, color: C.muted })
    box(s, 72, 326, 392, 280, C.ink, 'rounded-xl')
    imageContain(s, verify, '3D profile verification illustration', 116, 350, 305, 225)
    const capabilities = [
      ['Verification context', 'Show the status and last-checked detail of a profile.'],
      ['Practice schedules', 'Keep clinic and hospital availability distinct and readable.'],
      ['Patient feedback', 'Collect feedback with admin review controls.'],
    ]
    capabilities.forEach(([title, detail], i) => {
      const y = 327 + i * 92
      text(s, `0${i + 1}`, 560, y, 40, 24, { fontSize: 14, color: C.blue, bold: true })
      text(s, title, 620, y, 470, 26, { fontSize: 22, color: C.ink, bold: true })
      text(s, detail, 620, y + 33, 480, 28, { fontSize: 17, color: C.muted })
      if (i < capabilities.length - 1) rule(s, 620, y + 75, 500)
    })
    footer(s, 5)
  }

  // Slide 6 — close
  {
    const s = deck.slides.add()
    s.background.fill = C.ink
    box(s, 0, 0, 1280, 720, C.ink, 'none')
    box(s, 735, 0, 545, 720, '#0E315E', 'none')
    eyebrow(s, 'Why mediTrust is worth building', 72, 58, '#B8D9FF')
    text(s, 'A better care journey\ncan begin with clarity.', 72, 108, 620, 120, { fontSize: 56, color: C.white, bold: true, lineSpacing: 0.9 })
    text(s, 'mediTrust makes doctor discovery feel more understandable, more practical, and more human — especially when the city is new.', 72, 266, 565, 82, { fontSize: 22, color: '#D8E6F8', lineSpacing: 1.1 })
    box(s, 72, 410, 545, 100, C.white, 'rounded-xl')
    text(s, 'What we are proving today', 98, 431, 220, 22, { fontSize: 15, color: C.blue, bold: true })
    text(s, 'Clarity is a better starting point for care.', 98, 460, 485, 31, { fontSize: 23, color: C.ink, bold: true })
    text(s, 'Adnan Khan  •  Tushar Soni', 72, 578, 500, 25, { fontSize: 19, color: '#B8D9FF', bold: true })
    text(s, 'NEXHACK 2.0', 72, 615, 240, 20, { fontSize: 14, color: '#DFF4FF', bold: true })
    imageContain(s, feedback, '3D feedback illustration', 786, 96, 380, 455)
    text(s, 'Thank you', 840, 573, 315, 52, { fontSize: 45, color: C.white, bold: true, alignment: 'center' })
    footer(s, 6, true)
  }

  const pptx = await PresentationFile.exportPptx(deck)
  await pptx.save(OUT)

  await fs.mkdir('C:/Users/mak22/Desktop/mediTrust/.tmp/hackathon-ppt/rendered', { recursive: true })
  for (const [i, slide] of deck.slides.items.entries()) {
    const png = await deck.export({ slide, format: 'png', scale: 1 })
    await fs.writeFile(`C:/Users/mak22/Desktop/mediTrust/.tmp/hackathon-ppt/rendered/slide-${i + 1}.png`, new Uint8Array(await png.arrayBuffer()))
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
