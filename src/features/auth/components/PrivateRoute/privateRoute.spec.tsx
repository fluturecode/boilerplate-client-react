import { render } from '@testing-library/react';
import store from 'app/redux/store';
import * as useAuthStateModule from 'core/modules/auth/application/useAuthState';
import { Session } from 'core/modules/auth/domain/session';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PrivateRoute } from './PrivateRoute';

describe.skip('PrivateRoute', () => {
  const testPath = '/test/path';
  const loginPath = '/auth/login';

  const mockUseAuthState = jest.spyOn(useAuthStateModule, 'useAuthState');

  afterAll(() => {
    mockUseAuthState.mockReset();
  });

  describe('when a user is not authenticated', () => {
    beforeEach(() => {
      mockUseAuthState.mockReturnValue(null);
    });

    it('should redirect user to the login path', () => {
      const history = createMemoryHistory();
      history.push(testPath);

      render(
        <Provider store={store}>
          <Router history={history}>
            <PrivateRoute path={testPath} />
          </Router>
        </Provider>,
      );

      expect(history.location.pathname).toBe(loginPath);
    });
  });

  describe('when a user is authenticated', () => {
    beforeEach(() => {
      mockUseAuthState.mockReturnValue(new Session());
    });

    it('should direct user to the specified path', () => {
      const history = createMemoryHistory();
      history.push(testPath);

      render(
        <Provider store={store}>
          <Router history={history}>
            <PrivateRoute path={testPath} />
          </Router>
        </Provider>,
      );

      expect(history.location.pathname).toBe(testPath);
    });

    it('should render the specified component', () => {
      const history = createMemoryHistory();
      history.push(testPath);

      const TestComponent = () => <div data-testid='test-component'></div>;

      const { getByTestId } = render(
        <Provider store={store}>
          <Router history={history}>
            <PrivateRoute path={testPath} component={TestComponent} />
          </Router>
        </Provider>,
      );

      expect(getByTestId('test-component')).toBeInTheDocument();
    });
  });
});