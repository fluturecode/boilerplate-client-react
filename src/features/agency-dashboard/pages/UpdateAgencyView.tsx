import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetAgencyByIdQuery, useUpdateAgencyMutation } from 'common/api/agencyApi';
import { FormCard, PageHeader } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AgencyDetailForm, FormData } from '../components/AgencyDetailForm';

export interface RouteParams {
  id: string;
}

export const UpdateAgencyView: FC = () => {
  const { id } = useParams<RouteParams>();
  const history = useHistory();
  const [updateAgency] = useUpdateAgencyMutation();
  const { data: agency, isLoading: isLoadingAgency, error } = useGetAgencyByIdQuery(id);

  useEffect(() => {
    if (error) {
      notificationService.showErrorMessage('Unable to load agency. Returning to agency list.');
      history.replace('/agencies');
    }
  }, [error, history]);

  const handleFormSubmit = async (data: FormData) => {
    try {
      await updateAgency({ id: Number(id), ...data }).unwrap();
      notificationService.showSuccessMessage('Agency updated.');
      history.push('/agencies');
    } catch (error) {
      notificationService.showErrorMessage('Unable to update agency.');
    }
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Edit Agency</h1>
          <Link to='/agencies'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Agency List
          </Link>
        </div>
      </PageHeader>

      <Row>
        <Col>
          <FormCard>
            <Card.Body>
              <WithLoadingOverlay isLoading={isLoadingAgency}>
                <StyledFormWrapper>
                  <AgencyDetailForm
                    defaultValues={{ agencyName: agency?.agencyName ?? '' }}
                    submitButtonLabel='Update'
                    onSubmit={handleFormSubmit}
                  />
                </StyledFormWrapper>
              </WithLoadingOverlay>
            </Card.Body>
          </FormCard>
        </Col>
      </Row>
      
    </Container>
  );
};
