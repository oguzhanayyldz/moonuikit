import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../tabs'

// Mock icons for testing
const MockIcon = () => <span data-testid="mock-icon">Icon</span>
const MockBadge = () => <span data-testid="mock-badge">Badge</span>

describe('Tabs Components', () => {
  describe('Tabs Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <Tabs data-testid="tabs">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
          </Tabs>
        )
        
        const tabs = screen.getByTestId('tabs')
        expect(tabs).toBeInTheDocument()
        expect(tabs).toHaveAttribute('data-orientation', 'horizontal')
      })

      it('applies custom className', () => {
        render(
          <Tabs className="custom-tabs" data-testid="tabs">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabs = screen.getByTestId('tabs')
        expect(tabs).toHaveClass('custom-tabs')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(
          <Tabs ref={ref} data-testid="tabs">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
      })

      it('maintains displayName', () => {
        expect(Tabs.displayName).toBe('Tabs')
      })
    })

    describe('Orientation', () => {
      it('renders horizontal orientation by default', () => {
        render(
          <Tabs data-testid="tabs">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabs = screen.getByTestId('tabs')
        expect(tabs).toHaveAttribute('data-orientation', 'horizontal')
      })

      it('renders vertical orientation when vertical prop is true', () => {
        render(
          <Tabs vertical data-testid="tabs">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabs = screen.getByTestId('tabs')
        expect(tabs).toHaveAttribute('data-orientation', 'vertical')
      })
    })

    describe('HTML Attributes', () => {
      it('passes through HTML attributes', () => {
        render(
          <Tabs data-testid="tabs" aria-label="Navigation tabs">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabs = screen.getByTestId('tabs')
        expect(tabs).toHaveAttribute('aria-label', 'Navigation tabs')
      })
    })
  })

  describe('TabsList Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <Tabs>
            <TabsList data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toBeInTheDocument()
        expect(tabsList).toHaveAttribute('role', 'tablist')
      })

      it('applies custom className', () => {
        render(
          <Tabs>
            <TabsList className="custom-list" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('custom-list')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(
          <Tabs>
            <TabsList ref={ref} data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
      })

      it('maintains displayName', () => {
        expect(TabsList.displayName).toBe('TabsList')
      })
    })

    describe('Variants', () => {
      it('renders default variant correctly', () => {
        render(
          <Tabs>
            <TabsList variant="default" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('bg-muted', 'rounded-md', 'p-1')
      })

      it('renders pills variant correctly', () => {
        render(
          <Tabs>
            <TabsList variant="pills" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('bg-transparent', 'gap-2', 'p-0')
      })

      it('renders underline variant correctly', () => {
        render(
          <Tabs>
            <TabsList variant="underline" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('bg-transparent', 'border-b', 'gap-4')
      })

      it('renders cards variant correctly', () => {
        render(
          <Tabs>
            <TabsList variant="cards" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('bg-transparent', 'gap-2', 'p-0')
      })

      it('renders minimal variant correctly', () => {
        render(
          <Tabs>
            <TabsList variant="minimal" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('bg-transparent', 'gap-1', 'p-0')
      })
    })

    describe('Orientation', () => {
      it('renders horizontal orientation by default', () => {
        render(
          <Tabs>
            <TabsList data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('flex-row')
      })

      it('renders vertical orientation correctly', () => {
        render(
          <Tabs>
            <TabsList orientation="vertical" data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('flex-col', 'items-start', 'gap-1')
      })
    })

    describe('Full Width', () => {
      it('renders full width when fullWidth is true', () => {
        render(
          <Tabs>
            <TabsList fullWidth data-testid="tabs-list">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveClass('w-full')
      })
    })

    describe('HTML Attributes', () => {
      it('passes through HTML attributes', () => {
        render(
          <Tabs>
            <TabsList data-testid="tabs-list" aria-label="Tab navigation">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const tabsList = screen.getByTestId('tabs-list')
        expect(tabsList).toHaveAttribute('aria-label', 'Tab navigation')
      })
    })
  })

  describe('TabsTrigger Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" data-testid="tabs-trigger">Tab 1</TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toBeInTheDocument()
        expect(trigger).toHaveAttribute('role', 'tab')
        expect(trigger).toHaveTextContent('Tab 1')
      })

      it('applies custom className', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" className="custom-trigger" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('custom-trigger')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLButtonElement>()
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" ref={ref} data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      })

      it('maintains displayName', () => {
        expect(TabsTrigger.displayName).toBe('TabsTrigger')
      })
    })

    describe('Variants', () => {
      it('renders default variant correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" variant="default" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('rounded-md')
      })

      it('renders underline variant correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" variant="underline" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('rounded-none')
        expect(trigger).toHaveClass('border-b-2')
        expect(trigger).toHaveClass('border-transparent')
      })

      it('renders pills variant correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" variant="pills" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('rounded-full', 'bg-muted')
      })

      it('renders cards variant correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" variant="cards" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('rounded-md', 'bg-muted/50')
      })

      it('renders minimal variant correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" variant="minimal" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('rounded-sm', 'bg-transparent')
      })
    })

    describe('Sizes', () => {
      it('renders sm size correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" size="sm" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('h-7', 'px-2', 'text-xs')
      })

      it('renders md size correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" size="md" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('h-9', 'px-3', 'text-sm')
      })

      it('renders lg size correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" size="lg" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('h-10', 'px-4', 'text-base')
      })
    })

    describe('Icons', () => {
      it('renders left icon correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger 
                value="tab1" 
                icon={<MockIcon />} 
                iconPosition="left" 
                data-testid="tabs-trigger"
              >
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        const icon = screen.getByTestId('mock-icon')
        expect(icon).toBeInTheDocument()
        expect(icon.parentElement).toHaveClass('mr-2')
      })

      it('renders right icon correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger 
                value="tab1" 
                icon={<MockIcon />} 
                iconPosition="right" 
                data-testid="tabs-trigger"
              >
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        const icon = screen.getByTestId('mock-icon')
        expect(icon).toBeInTheDocument()
        expect(icon.parentElement).toHaveClass('ml-2')
      })

      it('does not render icon when iconPosition is none', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger 
                value="tab1" 
                icon={<MockIcon />} 
                iconPosition="none" 
                data-testid="tabs-trigger"
              >
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        expect(screen.queryByTestId('mock-icon')).not.toBeInTheDocument()
      })
    })

    describe('Badge', () => {
      it('renders badge correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger 
                value="tab1" 
                badge={<MockBadge />} 
                data-testid="tabs-trigger"
              >
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const badge = screen.getByTestId('mock-badge')
        expect(badge).toBeInTheDocument()
        expect(badge.parentElement).toHaveClass('ml-2')
      })
    })

    describe('Fade Tabs', () => {
      it('applies fade class when fadeTabs is true', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" fadeTabs data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('data-[state=inactive]:opacity-60')
      })
    })

    describe('Orientation', () => {
      it('renders vertical orientation correctly', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" orientation="vertical" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('justify-start', 'w-full', 'text-left')
      })
    })

    describe('Full Width', () => {
      it('renders full width when fullWidth is true', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" fullWidth data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveClass('w-full')
      })
    })

    describe('Interactions', () => {
      it('handles click events', async () => {
        const onValueChange = jest.fn()
        const user = userEvent.setup()
        
        render(
          <Tabs onValueChange={onValueChange} defaultValue="tab2">
            <TabsList>
              <TabsTrigger value="tab1" data-testid="tabs-trigger">
                Tab 1
              </TabsTrigger>
              <TabsTrigger value="tab2" data-testid="tabs-trigger-2">
                Tab 2
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">Content 1</TabsContent>
            <TabsContent value="tab2">Content 2</TabsContent>
          </Tabs>
        )
        
        // Verify initial state - tab2 should be active
        const trigger1 = screen.getByTestId('tabs-trigger')
        const trigger2 = screen.getByTestId('tabs-trigger-2')
        
        expect(trigger2).toHaveAttribute('data-state', 'active')
        expect(trigger1).toHaveAttribute('data-state', 'inactive')
        
        // Click on tab1 while tab2 is active (should trigger onValueChange)
        await user.click(trigger1)
        
        // Wait for callback to be called
        await waitFor(() => {
          expect(onValueChange).toHaveBeenCalledWith('tab1')
        })
      })
    })

    describe('HTML Attributes', () => {
      it('passes through HTML attributes', () => {
        render(
          <Tabs>
            <TabsList>
              <TabsTrigger value="tab1" data-testid="tabs-trigger" aria-label="First tab">
                Tab 1
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )
        
        const trigger = screen.getByTestId('tabs-trigger')
        expect(trigger).toHaveAttribute('aria-label', 'First tab')
      })
    })
  })

  describe('TabsContent Component', () => {
    describe('Basic Rendering', () => {
      it('renders correctly with default props', () => {
        render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" data-testid="tabs-content">
              Content 1
            </TabsContent>
          </Tabs>
        )
        
        const content = screen.getByTestId('tabs-content')
        expect(content).toBeInTheDocument()
        expect(content).toHaveTextContent('Content 1')
        expect(content).toHaveAttribute('role', 'tabpanel')
      })

      it('applies custom className', () => {
        render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="custom-content" data-testid="tabs-content">
              Content 1
            </TabsContent>
          </Tabs>
        )
        
        const content = screen.getByTestId('tabs-content')
        expect(content).toHaveClass('custom-content')
      })

      it('forwards ref correctly', () => {
        const ref = React.createRef<HTMLDivElement>()
        render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" ref={ref} data-testid="tabs-content">
              Content 1
            </TabsContent>
          </Tabs>
        )
        
        expect(ref.current).toBeInstanceOf(HTMLDivElement)
      })

      it('maintains displayName', () => {
        expect(TabsContent.displayName).toBe('TabsContent')
      })
    })

    describe('Animation', () => {
      it('applies animation classes when animated is true', () => {
        render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" animated data-testid="tabs-content">
              Content 1
            </TabsContent>
          </Tabs>
        )
        
        const content = screen.getByTestId('tabs-content')
        expect(content).toHaveClass('data-[state=active]:animate-fadeIn', 'data-[state=inactive]:animate-fadeOut')
      })
    })

    describe('HTML Attributes', () => {
      it('passes through HTML attributes', () => {
        render(
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" data-testid="tabs-content" aria-label="Tab content">
              Content 1
            </TabsContent>
          </Tabs>
        )
        
        const content = screen.getByTestId('tabs-content')
        expect(content).toHaveAttribute('aria-label', 'Tab content')
      })
    })
  })

  describe('Complex Combinations', () => {
    it('renders complete tabs with all components', () => {
      render(
        <Tabs defaultValue="tab1" data-testid="tabs">
          <TabsList variant="pills" data-testid="tabs-list">
            <TabsTrigger 
              value="tab1" 
              size="lg" 
              icon={<MockIcon />} 
              badge={<MockBadge />}
              data-testid="tabs-trigger-1"
            >
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" data-testid="tabs-trigger-2">
              Tab 2
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" animated data-testid="tabs-content-1">
            Content 1
          </TabsContent>
          <TabsContent value="tab2" data-testid="tabs-content-2">
            Content 2
          </TabsContent>
        </Tabs>
      )
      
      expect(screen.getByTestId('tabs')).toBeInTheDocument()
      expect(screen.getByTestId('tabs-list')).toHaveClass('bg-transparent', 'gap-2')
      expect(screen.getByTestId('tabs-trigger-1')).toHaveClass('h-10', 'px-4')
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
      expect(screen.getByTestId('mock-badge')).toBeInTheDocument()
      expect(screen.getByTestId('tabs-content-1')).toBeInTheDocument()
    })

    it('handles vertical tabs with all variants', () => {
      render(
        <Tabs vertical defaultValue="tab1" data-testid="tabs">
          <TabsList orientation="vertical" variant="underline" data-testid="tabs-list">
            <TabsTrigger 
              value="tab1" 
              orientation="vertical" 
              variant="underline"
              fadeTabs
              data-testid="tabs-trigger"
            >
              Tab 1
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" animated data-testid="tabs-content">
            Content 1
          </TabsContent>
        </Tabs>
      )
      
      const tabs = screen.getByTestId('tabs')
      const tabsList = screen.getByTestId('tabs-list')
      const trigger = screen.getByTestId('tabs-trigger')
      
      expect(tabs).toHaveAttribute('data-orientation', 'vertical')
      expect(tabsList).toHaveClass('flex-col', 'items-start')
      expect(trigger).toHaveClass('justify-start', 'w-full', 'data-[state=inactive]:opacity-60')
    })

    it('handles tab switching', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1" data-testid="trigger-1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" data-testid="trigger-2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="content-1">Content 1</TabsContent>
          <TabsContent value="tab2" data-testid="content-2">Content 2</TabsContent>
        </Tabs>
      )
      
      // Initially tab1 should be active
      expect(screen.getByTestId('content-1')).toBeInTheDocument()
      
      // Click tab2
      fireEvent.click(screen.getByTestId('trigger-2'))
      
      // Now tab2 content should be visible
      expect(screen.getByTestId('content-2')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles empty tabs', () => {
      render(<Tabs data-testid="tabs" />)
      
      const tabs = screen.getByTestId('tabs')
      expect(tabs).toBeInTheDocument()
    })

    it('handles tabs without content', () => {
      render(
        <Tabs>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
        </Tabs>
      )
      
      const trigger = screen.getByRole('tab')
      expect(trigger).toBeInTheDocument()
    })

    it('handles complex nested content', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-testid="tabs-content">
            <div>
              <h2>Nested Title</h2>
              <p>Nested paragraph</p>
              <button>Nested button</button>
            </div>
          </TabsContent>
        </Tabs>
      )
      
      const content = screen.getByTestId('tabs-content')
      expect(content).toHaveTextContent('Nested Title')
      expect(content).toHaveTextContent('Nested paragraph')
      expect(screen.getByRole('button', { name: 'Nested button' })).toBeInTheDocument()
    })

    it('passes through HTML attributes for all components', () => {
      render(
        <Tabs data-custom="tabs" defaultValue="tab1">
          <TabsList data-custom="list">
            <TabsTrigger value="tab1" data-custom="trigger">Tab 1</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" data-custom="content">Content 1</TabsContent>
        </Tabs>
      )
      
      expect(screen.getByRole('tablist').closest('[data-custom="tabs"]')).toBeInTheDocument()
      expect(screen.getByRole('tablist')).toHaveAttribute('data-custom', 'list')
      expect(screen.getByRole('tab')).toHaveAttribute('data-custom', 'trigger')
      expect(screen.getByRole('tabpanel')).toHaveAttribute('data-custom', 'content')
    })
  })
})
