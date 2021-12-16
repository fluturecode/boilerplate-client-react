import logo from 'assets/img/logo.jpeg';
import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useForgotPasswordMutation } from 'common/api/userApi';
import * as notificationService from 'common/services/notification';
import { handleApiError } from 'common/api/handleApiError';
import { ForgotPasswordForm, FormData } from '../components/ForgotPasswordForm';
import { LoginContainer, LoginRightCol, Title } from 'common/components/FrontPageLayout';
import { Col, Container, Row } from 'react-bootstrap';


export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (formData: FormData) => {
    try {
      const { message } = await forgotPassword(formData).unwrap();
      notificationService.showSuccessMessage(message);
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
              <Title>Forgot Password</Title>
              <p className="text-muted">Enter the email associated with your account and we'll send you instruction on how to reset your password.</p>
              <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />



              <div className='mt-2 mb-2'>
                <small>
                  Remember your password? <Link to="/auth/login">Go back to login</Link>
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
