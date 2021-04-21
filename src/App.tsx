import { FC } from 'react'
import { ErrorBoundary } from '@sentry/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Context
import { Provider as AuthProvider } from './context/auth.context'
import { Provider as FlashMessageProvider } from './context/flashMessage.context'

// Components
import { HomePage } from './components/homePage/HomePage'
import { LoginPage } from './components/loginPage/LoginPage'
import { ResetPasswordPage } from './components/resetPasswordPage/ResetPasswordPage'
import { FlashMessage } from './components/flashMessage/FlashMessage'
import { HolyGrailLayout } from './components/holyGrailLayout'
import { NavBar } from './components/navbar'
import { Footer } from './components/footer'

export const App: FC = () => (
  <ErrorBoundary>
    <AuthProvider>
      <FlashMessageProvider>
        <FlashMessage />
        <Router>
          <Switch>
            <HolyGrailLayout navBar={<NavBar />} footer={<Footer />}>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/auth/login" component={LoginPage} />
              <Route exact path="/auth/forgot-password" component={ResetPasswordPage} />
            </HolyGrailLayout>
          </Switch>
        </Router>
      </FlashMessageProvider>
    </AuthProvider>
  </ErrorBoundary>
)
