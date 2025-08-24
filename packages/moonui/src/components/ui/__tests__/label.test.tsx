import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Label } from '../label'

describe('Label Component', () => {
  it('renders correctly with default props', () => {
    render(<Label>Default Label</Label>)
    const label = screen.getByText('Default Label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('text-sm')
    expect(label).toHaveClass('font-medium')
    expect(label).toHaveClass('leading-none')
    expect(label).toHaveClass('text-gray-900')
    expect(label).toHaveClass('dark:text-gray-200')
    expect(label).toHaveClass('peer-disabled:cursor-not-allowed')
    expect(label).toHaveClass('peer-disabled:opacity-70')
    expect(label).toHaveClass('dark:peer-disabled:opacity-60')
    expect(label).toHaveClass('transition-colors')
    expect(label).toHaveClass('duration-200')
  })

  it('renders with custom text content', () => {
    render(<Label>Custom Label Text</Label>)
    const label = screen.getByText('Custom Label Text')
    expect(label).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Label className="custom-label">Test Label</Label>)
    const label = screen.getByText('Test Label')
    expect(label).toHaveClass('custom-label')
    // Should still have default classes
    expect(label).toHaveClass('text-sm')
    expect(label).toHaveClass('font-medium')
  })

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Ref Label</Label>)
    expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    expect(ref.current).toHaveTextContent('Ref Label')
  })

  it('passes through HTML label props', () => {
    render(<Label htmlFor="test-input" id="test-label">Form Label</Label>)
    const label = screen.getByText('Form Label')
    expect(label).toHaveAttribute('for', 'test-input')
    expect(label).toHaveAttribute('id', 'test-label')
  })

  it('handles onClick events', () => {
    const onClick = jest.fn()
    render(<Label onClick={onClick}>Clickable Label</Label>)
    const label = screen.getByText('Clickable Label')
    label.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders as a label element', () => {
    render(<Label>Label Element</Label>)
    const label = screen.getByText('Label Element')
    expect(label.tagName).toBe('LABEL')
  })

  it('supports data attributes', () => {
    render(<Label data-testid="custom-label" data-custom="value">Data Label</Label>)
    const label = screen.getByTestId('custom-label')
    expect(label).toHaveAttribute('data-custom', 'value')
  })

  it('supports aria attributes', () => {
    render(<Label aria-label="Accessible Label" aria-describedby="description">ARIA Label</Label>)
    const label = screen.getByText('ARIA Label')
    expect(label).toHaveAttribute('aria-label', 'Accessible Label')
    expect(label).toHaveAttribute('aria-describedby', 'description')
  })

  it('handles empty content', () => {
    render(<Label data-testid="empty-label"></Label>)
    const label = screen.getByTestId('empty-label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveClass('text-sm')
    expect(label.tagName).toBe('LABEL')
  })

  it('handles children as React nodes', () => {
    render(
      <Label>
        <span>Child</span> Label
      </Label>
    )
    const label = screen.getByText((content, element) => {
      return element?.tagName === 'LABEL' && element.textContent === 'Child Label'
    })
    expect(label).toBeInTheDocument()
    expect(label.querySelector('span')).toHaveTextContent('Child')
  })

  it('maintains displayName from Radix primitive', () => {
    expect(Label.displayName).toBeDefined()
  })
})
