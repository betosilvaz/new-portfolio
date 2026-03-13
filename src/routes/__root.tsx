import { Outlet, createRootRoute } from '@tanstack/react-router'

import ThemeProvider from '@/providers/ThemeProvider'
import type { ReactNode } from 'react'
import { CursorProvider, FramerCursor } from '@/features/home/components/Cursor'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <CursorProvider>
      <FramerCursor/>
      <ThemeProvider>
        <Pattern>
          <Outlet />
        </Pattern>
      </ThemeProvider>
    </CursorProvider>
  )
}

function Pattern({ children }: { children: ReactNode }) {
  return (
    <div className="pattern">
      { children }
    </div>
  )
}