import logo from 'assets/img/logo.jpeg';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { handleApiError } from 'common/api/handleApiError';
import { useSignUpMutation } from 'common/api/userApi';
import { LoginContainer, LoginRightCol, Title } from 'common/components/FrontPageLayout';
import * as notificationService from 'common/services/notification';
import { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { FormData, SignUpForm } from '../components/SignUpForm';

export const SignUpPage: FC = () => {
  const history = useHistory();
  const [signUp] = useSignUpMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData };

    try {
      await signUp(data);
      notificationService.showSuccessMessage(`An activation email has been sent to ${data.email}.`);
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <Container fluid>
      <Row>
        <Col>
          <LoginContainer>
            <div>
              <img src={logo} alt='Bitwise Logo' />
              <Title>Member Registration</Title>
              <p className="text-muted">Register for the Bitwise Admin Panel to join the best admin panel on the internet.</p>
              <SignUpForm onSubmit={onSubmit} onCancel={onCancel} />
              <div className='mt-2 mb-2'>
                <small>
                Already have an account? <Link to="/auth/login">Log In</Link>
                </small>
              </div>
            </div>
          </LoginContainer>
        </Col>

        <LoginRightCol />
      </Row>
    </Container>
  );
};
