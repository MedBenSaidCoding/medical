import { getServerSession } from 'next-auth'

// Type Imports
import type { ChildrenType, Direction } from '@core/types'

// Context Imports
import { NextAuthProvider } from '@/contexts/nextAuthProvider'
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

// Config Imports
import themeConfig from '@configs/themeConfig'

// Styled Component Imports
import AppReactToastify from '@/libs/styles/AppReactToastify'

// Util Imports
import { getDemoName, getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'
import { authOptions } from '@/libs/auth'
import { ReactQueryClientProvider } from './ReactQueryClientProvider'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = async (props: Props) => {
  // Props
  const { children, direction } = props

  // Vars
  const mode = getMode()
  const settingsCookie = getSettingsFromCookie()
  const demoName = getDemoName()
  const systemMode = getSystemMode()

  const session = await getServerSession(authOptions)

  return (
    <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH} session={session}>
      <ReactQueryClientProvider>
        <VerticalNavProvider>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode} demoName={demoName}>
            <ThemeProvider direction={direction} systemMode={systemMode}>
              {children}
              <AppReactToastify position={themeConfig.toastPosition} hideProgressBar />
            </ThemeProvider>
          </SettingsProvider>
        </VerticalNavProvider>
      </ReactQueryClientProvider>
    </NextAuthProvider>
  )
}

export default Providers
