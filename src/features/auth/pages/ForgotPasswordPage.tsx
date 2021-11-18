import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm, FormData } from '../components/ForgotPasswordForm';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import * as notificationService from 'common/services/notification';
import { useForgotPasswordMutation } from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const ForgotPasswordPage: FC = () => {
  const history = useHistory();
  const [forgotPassword] = useForgotPasswordMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const { message } = await forgotPassword(data).unwrap();
      notificationService.showSuccessMessage(message);
      history.push('/auth/login');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Forgot Password</Title>
        <ForgotPasswordForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};