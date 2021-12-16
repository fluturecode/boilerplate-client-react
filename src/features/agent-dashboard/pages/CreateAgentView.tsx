import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCreateAgentMutation } from 'common/api/agentApi';
import { FormCard, PageHeader } from 'common/components/Common';
import * as notificationService from 'common/services/notification';
import { StyledFormWrapper } from 'common/styles/form';
import { FC } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AgentDetailForm, FormData } from '../components/AgentDetailForm';

export const CreateAgentView: FC = () => {
  const history = useHistory();
  const [createAgent] = useCreateAgentMutation();

  const handleFormCancel = () => {
    history.goBack();
  };

  const handleFormSubmit = async (data: FormData) => {
    try {
      await createAgent({ ...data, thumbnail: 'https://shift3tech.com/images/s3-logo-white.svg' }).unwrap();
      notificationService.showSuccessMessage('Agent created.');
      history.push('/agents');
    } catch (error) {
      notificationService.showErrorMessage('Unable to add agent.');
    }
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Create Agent</h1>
          <Link to='/agents'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Agent List
          </Link>
        </div>
      </PageHeader>

      <FormCard>
        <Card.Body>
          <StyledFormWrapper>
            <AgentDetailForm submitButtonLabel='CREATE' onCancel={handleFormCancel} onSubmit={handleFormSubmit} />
          </StyledFormWrapper>
        </Card.Body>
      </FormCard>
    </Container>
  );
};
