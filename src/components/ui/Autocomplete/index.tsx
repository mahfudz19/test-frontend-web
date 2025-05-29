'use client'

import React, { useCallback, useEffect, useRef, useState, JSX, MouseEvent, AriaRole } from 'react'
import { twMerge } from 'tailwind-merge'
import CircularProgress from '../CircularProgress'
import IconCheck from '../Icon/IconCheck'
import IconClose from '../Icon/IconClose'
import IconCloseSmall from '../Icon/IconCloseSmall'
import IconDownLine from '../Icon/IconDownLine'
import IconButton from '../IconButton'
import Input, { TextFieldProps } from '../Input'
import Popover from '../Popover'
import Chip from '../Chip'
import { toastError } from 'src/lib/SWRfetcher'

// 🔥 Custom debounce function
const useDebouncedCallback = (callback: (...args: any[]) => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  return (...args: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}

// 🔹 WithId Interface
interface WithId {
  _id: string
  disabled?: boolean
  [key: string]: any
}

// 🔹 Props AutoComplete
export interface AutoCompleteProps<T extends WithId> extends Omit<TextFieldProps, 'value'> {
  name?: string
  fetch?: (query: string) => Promise<T[]>
  options?: T[]
  field?: T | T[]
  multiple?: boolean
  keyLabelSelect?: string
  isClearable?: boolean
  setFieldValue?: (option?: T | T[]) => void
  renderOption?: (
    option: T,
    props: {
      role?: AriaRole
      key: string
      'aria-disabled': boolean
      className: string
      onMouseEnter: () => void
      onClick: (e?: MouseEvent) => void
    }
  ) => JSX.Element
  renderFieldArray?: (
    item: T,
    props: { key: number; tabIndex: number; onDelete: () => void; noAction?: boolean }
  ) => JSX.Element
  classNames?: {
    root?: string
    ulRenderFieldArray?: string
    liRenderFieldArray?: string
    inputClassNames?:
      | {
          root?: string
          container?: string
          containerInput?: string
          startAdornment?: string
          input?: string
          endAdornment?: string
          label?: string
          helperText?: string
        }
      | undefined
  }
  sortingFieldArray?: (item: T[]) => T[]
  lableSort?: (firstIndex: boolean, item: T, prevItem: T, lastIndex: boolean) => JSX.Element
}

function AutoComplete<T extends WithId>(props: AutoCompleteProps<T>) {
  const {
    options = [],
    fetch,
    name,
    field,
    multiple,
    onChange,
    isClearable,
    keyLabelSelect = 'name',
    setFieldValue,
    renderOption,
    renderFieldArray,
    classNames,
    sortingFieldArray,
    lableSort,
    ...rest
  } = props
  const [open, setOpen] = useState(false)
  const [valueState, setValueState] = useState<{ query: string; label: string }>({ label: '', query: '' })
  const [selectedOptions, setSelectedOptions] = useState<T[]>([])
  const [filteredOptions, setFilteredOptions] = useState(options || [])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  // ✅ Set default value saat pertama kali render
  useEffect(() => {
    if (multiple) {
      setSelectedOptions(Array.isArray(field) ? field : [])
      setValueState({ label: '', query: '' })
    } else {
      if (Array.isArray(field)) {
        setSelectedOptions(field)
        setValueState({ label: '', query: '' })
      } else {
        setSelectedOptions(field ? [field] : [])
        setValueState({ query: '', label: field?.[keyLabelSelect] || '' })
      }
    }
  }, [field, multiple, keyLabelSelect])

  // ✅ Menjaga fokus input saat popover terbuka
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.querySelector('input')?.focus(), 50)

    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleRemoveLastSelectedOption = () => {
    setSelectedOptions(prev => {
      const updated = prev.slice(0, -1) // Hapus opsi terakhir
      const event = {
        target: { name: name, value: multiple ? updated : updated[0] || null }
      } as unknown as React.ChangeEvent<HTMLInputElement>

      if (onChange) onChange(event)
      if (setFieldValue) setFieldValue(multiple ? updated : updated[0] || undefined)

      return updated
    })
  }
  const handleOpen = (value?: boolean) => {
    if (rest.disabled || rest.readOnly) return
    if (value === true) {
      if (open === false) setOpen(true)
    } else setOpen(p => !p)
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      inputRef.current?.querySelector('input')?.focus()
    }, 50)
  }

  const navigateOptions = (direction: 1 | -1) => {
    if (filteredOptions.length === 0) return
    const newIndex = (highlightedIndex + direction + filteredOptions.length) % filteredOptions.length
    setHighlightedIndex(newIndex)
    scrollToHighlightedOption(newIndex)
  }

  const scrollToHighlightedOption = (index: number) => {
    setTimeout(() => {
      const popover = document.querySelector('.custom-popover > div.overflow-y-auto') as HTMLDivElement | null
      if (!popover) return

      const optionElements = popover.querySelectorAll('[role="option"]') as NodeListOf<HTMLDivElement>
      if (optionElements.length === 0) return

      const highlightedElement = optionElements[index]
      if (!highlightedElement) return

      const { offsetTop, offsetHeight } = highlightedElement
      const { scrollTop, clientHeight } = popover

      if (offsetTop < scrollTop) popover.scrollTop = offsetTop
      else if (offsetTop + offsetHeight > scrollTop + clientHeight)
        popover.scrollTop = offsetTop + offsetHeight - clientHeight
    }, 10)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (rest.disabled || rest.readOnly) return

    if (!open && e.key === 'Enter') {
      e.preventDefault()
      handleOpen(true)
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        navigateOptions(1)
        break

      case 'ArrowUp':
        e.preventDefault()
        navigateOptions(-1)
        break

      case 'Enter':
        e.preventDefault()
        if (highlightedIndex !== -1) {
          const optionElements = document.querySelectorAll('[role="option"]') as NodeListOf<HTMLElement>
          const highlightedElement = optionElements[highlightedIndex]

          if (!highlightedElement || highlightedElement.getAttribute('aria-disabled') === 'true') return

          handleSelect(filteredOptions[highlightedIndex])
        }
        break

      case 'Escape':
        e.preventDefault()
        if (open) e.stopPropagation()
        handleClose()
        break

      case 'Backspace':
        if (multiple && !valueState.query && selectedOptions.length > 0) {
          e.preventDefault()
          handleRemoveLastSelectedOption()
        } else if (!valueState.query && !valueState.label && selectedOptions.length > 0) setSelectedOptions([])

        break
    }
  }

  const handleSelect = (option?: T) => {
    if (rest.disabled || rest.readOnly) return
    let newSelected: T[] | undefined

    if (option) {
      if (multiple) {
        newSelected = selectedOptions.some(opt => opt._id === option?._id)
          ? selectedOptions.filter(opt => opt._id !== option?._id)
          : [...selectedOptions, option]
        setValueState(p => ({ ...p, query: '' }))
      } else {
        setValueState(p => ({ ...p, label: option[keyLabelSelect] || '' }))
      }
    } else {
      setValueState({ label: '', query: '' })
      setSelectedOptions([])
    }

    const event = {
      target: { name: name, value: multiple ? newSelected : option }
    } as unknown as React.ChangeEvent<HTMLInputElement>
    if (onChange) onChange(event)
    if (setFieldValue) setFieldValue(multiple ? newSelected : option)
    setOpen(false)
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (rest.disabled || rest.readOnly) return
    setOpen(false)
    setValueState({ label: '', query: e.target.value })
    debounceFetch(e.target.value)
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceFetch = useCallback(
    useDebouncedCallback(async (query: string) => {
      if (fetch && query) {
        setLoading(true)
        fetch(query)
          .then(data => setFilteredOptions(data))
          .catch(e => toastError(e))
          .finally(() => {
            setOpen(true)
            setLoading(false)
          })
      } else {
        setFilteredOptions(
          query.trim()
            ? options.filter(option => option?.[keyLabelSelect]?.toLowerCase().includes(query.toLowerCase()))
            : options
        )
        setOpen(true)
      }
    }, 500),
    [fetch, options]
  )

  let sortingOrNot = field
  if (sortingFieldArray) {
    if (Array.isArray(sortingOrNot)) sortingOrNot = sortingFieldArray(sortingOrNot)
  }

  return (
    <>
      <div onClick={() => handleOpen()} className={classNames?.root}>
        <Input
          containerRef={inputRef}
          name={name}
          focused={open || selectedOptions.length > 0}
          autoComplete='off'
          value={valueState.label || valueState.query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={rest.placeholder || 'Ketik di sini...'}
          className=''
          classNames={{
            input: 'cursor-text',
            container: 'flex flex-wrap gap-y-0 pt-0.5 pr-12',
            containerInput: multiple ? 'w-auto' : undefined
          }}
          startAdornment={
            multiple && !renderFieldArray && selectedOptions.length > 0 ? (
              <>
                {selectedOptions.map(option => (
                  <Chip
                    variant='light'
                    color='primary'
                    sizes='small'
                    key={`chip-${option._id}`}
                    className='my-1'
                    endIcon={
                      <IconButton
                        sizes='small'
                        color='error'
                        variant='text'
                        type='button'
                        className='ml-0.5'
                        tabIndex={-1}
                        disabled={rest.disabled || rest.readOnly}
                        onClick={e => {
                          e.stopPropagation()
                          handleSelect(option)
                        }}
                      >
                        <IconClose fontSize={13} />
                      </IconButton>
                    }
                  >
                    {option?.[keyLabelSelect]}
                  </Chip>
                ))}
              </>
            ) : undefined
          }
          endAdornment={
            <>
              {rest.endAdornment}
              <div className='flex justify-end gap-0.5 h-full py-2 absolute top-0 right-2 bottom-0 w-10'>
                {isClearable && selectedOptions.length > 0 && !(rest.disabled || rest.readOnly) && (
                  <div className='flex items-center justify-center' onClick={e => e.stopPropagation()}>
                    <IconButton
                      sizes='small'
                      color='error'
                      variant='text'
                      type='button'
                      className='p-0.5'
                      tabIndex={-1}
                      onClick={() => handleSelect()}
                    >
                      <IconCloseSmall fontSize={16} />
                    </IconButton>
                  </div>
                )}
                {loading && (
                  <div className='flex items-center justify-center' onClick={e => e.stopPropagation()}>
                    <CircularProgress size={16} color='primary' />
                  </div>
                )}
                <div className='flex items-center justify-center border-l-2 border-divider h-full pl-1'>
                  <IconDownLine fontSize={18} />
                </div>
              </div>
            </>
          }
          {...rest}
        />
      </div>
      {multiple && (
        <ul className={twMerge('p-1 overflow-auto text-sm max-h-64', classNames?.ulRenderFieldArray)}>
          {(Array.isArray(sortingOrNot) ? sortingOrNot : [])?.map?.((item: T, i: number) => {
            const sort = Array.isArray(sortingOrNot) ? sortingOrNot : []
            return (
              <li key={`${i}`} className={classNames?.liRenderFieldArray}>
                {lableSort ? lableSort(i === 0, item, sort[i - 1], i === (sortingOrNot?.length || 0) - 1) : <></>}
                {renderFieldArray?.(item, {
                  key: i,
                  tabIndex: -1,
                  onDelete: () => (!(rest.disabled || rest.readOnly) ? handleSelect() : null),
                  noAction: rest.disabled || rest.readOnly ? true : undefined
                })}
              </li>
            )
          })}
        </ul>
      )}
      <Popover
        anchorEl={inputRef.current}
        open={open}
        onClose={() => setOpen(false)}
        zIndex={50}
        anchor='bottom'
        followWidthAnchor
        className='custom-popover duration-150 border border-divider overflow-hidden'
        onlyShowUpOrDown
        noLastFocusedElement
      >
        <div tabIndex={-1} className='outline-none p-2 flex flex-col gap-0.5 max-h-60 overflow-y-auto'>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = selectedOptions.some(v => v._id === option._id)
              const isDisabled = option.disabled ?? false
              const className = twMerge(
                'px-2 py-1 duration-300 flex justify-between rounded-lg',
                isDisabled ? 'opacity-50 cursor-not-allowed' : '',
                highlightedIndex === index
                  ? isDisabled
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : 'ring-2 ring-offset-1 ring-primary-main bg-secondary-light/25'
                  : 'hover:bg-secondary-light/25  hover:outline-none',
                isSelected && renderOption && "justify-between after:content-['✓'] after:block"
              )

              const props = {
                key: option?._id,
                role: 'option',
                'aria-disabled': isDisabled,
                className: className,
                onMouseEnter: () => {
                  if (!isDisabled) setHighlightedIndex(index)
                },
                onClick: e => {
                  e?.preventDefault()
                  if (!isDisabled) handleSelect(option)
                }
              }

              if (renderOption) return renderOption(option, props)
              return (
                <div {...props} key={option?._id}>
                  <span>{option?.[keyLabelSelect]}</span>
                  {isSelected && !isDisabled && (
                    <span className='mt-0.5'>
                      <IconCheck fontSize={18} />
                    </span>
                  )}
                </div>
              )
            })
          ) : (
            <div className='text-xs text-text-secondary text-center' key='no-option'>
              Tidak ada option...
            </div>
          )}
        </div>
      </Popover>
    </>
  )
}

export default AutoComplete
