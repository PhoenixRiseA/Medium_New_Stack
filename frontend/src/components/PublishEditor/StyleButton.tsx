import React from 'react'
    
type Props = {
  active: boolean
  style: string
  label: string
  onToggle: (bockType: string) => void
}

const StyleButton = ({ active, style, label, onToggle }: Props) => {
  const _onToggle = (e: any) => {
    e.preventDefault()
    onToggle(style)
  }

  const className = 'RichEditor-styleButton'

  return (
    <button
      className={`${active ? 'bg-gray-900' : ' bg-gray-700'} w-fit p-1  m-1 text-white rounded-md`}
      onClick={_onToggle}
    >
      {label}
    </button>
  )
}

export default React.memo(StyleButton)