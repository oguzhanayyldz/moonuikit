import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Skeleton, SkeletonText, SkeletonAvatar, SkeletonCard } from '../skeleton'

describe('Skeleton Components', () => {
  describe('Skeleton Component', () => {
    it('renders correctly with default props', () => {
      render(<Skeleton data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toBeInTheDocument()
      expect(skeleton).toHaveClass('animate-pulse')
      expect(skeleton).toHaveClass('rounded-md')
      expect(skeleton).toHaveClass('bg-muted')
    })

    it('applies custom className', () => {
      render(<Skeleton className="custom-skeleton" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('custom-skeleton')
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<Skeleton ref={ref} data-testid="skeleton" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('applies custom dimensions', () => {
      render(<Skeleton height="100px" width="200px" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveStyle({ height: '100px', width: '200px' })
    })

    it('renders primary variant', () => {
      render(<Skeleton variant="primary" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('bg-primary/10')
    })

    it('renders circle shape', () => {
      render(<Skeleton shape="circle" data-testid="skeleton" />)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('rounded-full')
    })

    it('shows children when loaded', () => {
      render(<Skeleton isLoaded={true} data-testid="skeleton">Content</Skeleton>)
      expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('shows skeleton when not loaded', () => {
      render(<Skeleton isLoaded={false} data-testid="skeleton">Content</Skeleton>)
      const skeleton = screen.getByTestId('skeleton')
      expect(skeleton).toHaveClass('animate-pulse')
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })

    it('maintains displayName', () => {
      expect(Skeleton.displayName).toBe('Skeleton')
    })
  })

  describe('SkeletonText Component', () => {
    it('renders correctly with default props', () => {
      render(<SkeletonText data-testid="skeleton-text" />)
      const container = screen.getByTestId('skeleton-text')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('flex')

      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons).toHaveLength(3) // default lines
    })

    it('renders custom number of lines', () => {
      render(<SkeletonText lines={5} data-testid="skeleton-text" />)
      const container = screen.getByTestId('skeleton-text')
      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons).toHaveLength(5)
    })

    it('applies custom line height', () => {
      render(<SkeletonText lineHeight="1rem" data-testid="skeleton-text" />)
      const container = screen.getByTestId('skeleton-text')
      const firstLine = container.querySelector('.animate-pulse')
      expect(firstLine).toHaveStyle({ height: '1rem' })
    })

    it('applies custom spacing', () => {
      render(<SkeletonText spacing="1rem" data-testid="skeleton-text" />)
      const container = screen.getByTestId('skeleton-text')
      expect(container).toHaveStyle({ gap: '1rem' })
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<SkeletonText ref={ref} data-testid="skeleton-text" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(SkeletonText.displayName).toBe('SkeletonText')
    })
  })

  describe('SkeletonAvatar Component', () => {
    it('renders correctly with default props', () => {
      render(<SkeletonAvatar data-testid="skeleton-avatar" />)
      const avatar = screen.getByTestId('skeleton-avatar')
      expect(avatar).toBeInTheDocument()
      expect(avatar).toHaveClass('animate-pulse')
      expect(avatar).toHaveClass('rounded-full')
      expect(avatar).toHaveClass('shrink-0')
      expect(avatar).toHaveStyle({ height: '2.5rem', width: '2.5rem' })
    })

    it('applies custom size', () => {
      render(<SkeletonAvatar size="3rem" data-testid="skeleton-avatar" />)
      const avatar = screen.getByTestId('skeleton-avatar')
      expect(avatar).toHaveStyle({ height: '3rem', width: '3rem' })
    })

    it('applies custom size as number', () => {
      render(<SkeletonAvatar size={48} data-testid="skeleton-avatar" />)
      const avatar = screen.getByTestId('skeleton-avatar')
      expect(avatar).toHaveStyle({ height: '48px', width: '48px' })
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<SkeletonAvatar ref={ref} data-testid="skeleton-avatar" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('renders with custom variant', () => {
      render(<SkeletonAvatar variant="primary" data-testid="skeleton-avatar" />)
      const avatar = screen.getByTestId('skeleton-avatar')
      expect(avatar).toHaveClass('bg-primary/10')
    })

    it('maintains displayName', () => {
      expect(SkeletonAvatar.displayName).toBe('SkeletonAvatar')
    })
  })

  describe('SkeletonCard Component', () => {
    it('renders correctly with default props', () => {
      render(<SkeletonCard data-testid="skeleton-card" />)
      const card = screen.getByTestId('skeleton-card')
      expect(card).toBeInTheDocument()
      expect(card).toHaveClass('overflow-hidden')
      expect(card).toHaveClass('rounded-md')
      expect(card).toHaveClass('border')
      expect(card).toHaveClass('bg-background')
      expect(card).toHaveClass('p-4')
    })

    it('shows header by default', () => {
      render(<SkeletonCard data-testid="skeleton-card" />)
      const card = screen.getByTestId('skeleton-card')

      // Check for avatar in header
      const avatar = card.querySelector('.shrink-0.rounded-full')
      expect(avatar).toBeInTheDocument()
    })

    it('hides header when showHeader is false', () => {
      render(<SkeletonCard showHeader={false} data-testid="skeleton-card" />)
      const card = screen.getByTestId('skeleton-card')

      // Avatar should not be present
      const avatar = card.querySelector('.shrink-0.rounded-full')
      expect(avatar).not.toBeInTheDocument()
    })

    it('renders custom number of content lines', () => {
      render(<SkeletonCard contentLines={5} data-testid="skeleton-card" />)
      const card = screen.getByTestId('skeleton-card')

      const textContainer = card.querySelector('.flex.flex-col')
      expect(textContainer).toBeInTheDocument()

      const contentLines = textContainer?.querySelectorAll('.animate-pulse')
      expect(contentLines).toHaveLength(5)
    })

    it('shows footer by default', () => {
      render(<SkeletonCard data-testid="skeleton-card" />)
      const card = screen.getByTestId('skeleton-card')

      const footer = card.querySelector('.border-t')
      expect(footer).toBeInTheDocument()
    })

    it('hides footer when showFooter is false', () => {
      render(<SkeletonCard showFooter={false} data-testid="skeleton-card" />)
      const card = screen.getByTestId('skeleton-card')

      const footer = card.querySelector('.border-t')
      expect(footer).not.toBeInTheDocument()
    })

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>()
      render(<SkeletonCard ref={ref} data-testid="skeleton-card" />)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })

    it('maintains displayName', () => {
      expect(SkeletonCard.displayName).toBe('SkeletonCard')
    })
  })

  describe('Edge Cases', () => {
    it('handles zero lines in SkeletonText', () => {
      render(<SkeletonText lines={0} data-testid="skeleton-text" />)
      const container = screen.getByTestId('skeleton-text')
      const skeletons = container.querySelectorAll('.animate-pulse')
      expect(skeletons).toHaveLength(0)
    })

    it('handles all sections disabled in SkeletonCard', () => {
      render(
        <SkeletonCard
          showHeader={false}
          showFooter={false}
          contentLines={1}
          data-testid="skeleton-card"
        />
      )
      const card = screen.getByTestId('skeleton-card')

      // No header avatar
      const avatar = card.querySelector('.shrink-0.rounded-full')
      expect(avatar).not.toBeInTheDocument()

      // No footer
      const footer = card.querySelector('.border-t')
      expect(footer).not.toBeInTheDocument()

      // Only content lines
      const textContainer = card.querySelector('.flex.flex-col')
      const contentLines = textContainer?.querySelectorAll('.animate-pulse')
      expect(contentLines).toHaveLength(1)
    })

    it('passes through HTML attributes', () => {
      render(<Skeleton data-testid="skeleton-test" id="skeleton-1" />)
      const skeleton = screen.getByTestId('skeleton-test')
      expect(skeleton).toHaveAttribute('id', 'skeleton-1')
    })
  })
})
