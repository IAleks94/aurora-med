import { useId, useState } from 'react'
import {
  Answer,
  HeaderButton,
  IconWrap,
  Item,
  List,
  PanelInner,
  PanelOuter,
  Question,
} from './Accordion.styled'

export type AccordionItemData = {
  question: string
  answer: string
}

export type AccordionProps = {
  items: AccordionItemData[]
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center',
          transition: 'transform 0.25s ease',
        }}
      />
    </svg>
  )
}

function AccordionRow({
  item,
  panelId,
  buttonId,
}: {
  item: AccordionItemData
  panelId: string
  buttonId: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Item>
      <HeaderButton
        type="button"
        id={buttonId}
        $open={open}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <Question>{item.question}</Question>
        <IconWrap>
          <Chevron open={open} />
        </IconWrap>
      </HeaderButton>
      <PanelOuter $open={open} aria-hidden={!open}>
        <PanelInner>
          <Answer id={panelId} role="region" aria-labelledby={buttonId}>
            {item.answer}
          </Answer>
        </PanelInner>
      </PanelOuter>
    </Item>
  )
}

export function Accordion({ items }: AccordionProps) {
  const baseId = useId()

  return (
    <List>
      {items.map((item, index) => (
        <AccordionRow
          key={`${baseId}-${index}`}
          item={item}
          buttonId={`${baseId}-header-${index}`}
          panelId={`${baseId}-panel-${index}`}
        />
      ))}
    </List>
  )
}
