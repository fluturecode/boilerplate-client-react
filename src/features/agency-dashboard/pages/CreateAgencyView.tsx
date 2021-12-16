import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateAgencyMutation } from 'common/api/agencyApi';
import { FormCard, PageHeader } from 'common/components/Common';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';

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
    <Container>
      <PageHeader>
        <div>
          <h1>Create Agency</h1>
          <Link to='/agencies'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Agency List
          </Link>
        </div>
      </PageHeader>

      <FormCard>
        <Card.Body>
          <StyledFormWrapper>
            <AgencyDetailForm submitButtonLabel='Create' onSubmit={handleFormSubmit} />
          </StyledFormWrapper>
        </Card.Body>
      </FormCard>
    </Container>
  );
};
