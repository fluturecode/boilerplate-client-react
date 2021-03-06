import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';
import { useCreateAgencyMutation } from 'common/api/agencyApi';
import * as notificationService from 'common/services/notification';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';

export const CreateAgencyView: FC = () => {
  const history = useHistory();
  const [createAgency] = useCreateAgencyMutation();

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgency(data).unwrap();
      notificationService.showSuccessMessage('Agency created.');
      history.push('/agencies');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add agency.');
    }
  };

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Create Agency</Title>
        <AgencyDetailForm submitButtonLabel='CREATE' onSubmit={handleFormSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
