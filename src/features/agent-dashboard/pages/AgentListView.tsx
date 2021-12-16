import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteAgentMutation, useGetAgentsQuery } from 'common/api/agentApi';
import { CustomRenderer, GenericTable, TableHeader } from 'common/components';
import { ActionButtonProps } from 'common/components/ActionButton';
import { NoContent, PageHeader, TableCard } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { formatPhoneNumber } from 'common/components/PhoneInput';
import { useConfirmationModal } from 'common/hooks';
import { Agent } from 'common/models';
import * as notificationService from 'common/services/notification';
import { CreateButton } from 'common/styles/button';
import { HasPermission, useRbac } from 'features/rbac';
import { FC } from 'react';
import { Card, Dropdown, DropdownButton, FormControl, InputGroup, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

type AgentTableItem = {
  id: number;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  actions: ActionButtonProps[];
};

const FilterHeader = styled(Row)`
  input {
    border-color: #efefef;
    background: #fafafafa;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

export const AgentListView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const { data: agents = [], isLoading: isLoadingAgents } = useGetAgentsQuery();
  const [deleteAgent] = useDeleteAgentMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();

  const navigateToUpdateView = (agent: Agent) => {
    history.push(`/agents/update-agent/${agent.id}`);
  };

  const handleDelete = (agent: Agent) => {
    const message = `Delete ${agent.name}?`;

    const onConfirm = () => {
      deleteAgent(agent.id);
      closeModal();
      notificationService.showSuccessMessage('Agent deleted.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  // Set up table headers
  const headers: TableHeader<AgentTableItem>[] = [
    { key: 'name', label: 'Agent Name' },
    { key: 'description', label: 'Description' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'actions', label: '' },
  ];

  // Transform Agent objects returned from the API into the table item data format expected by the table.
  const items: AgentTableItem[] = agents.map(agent => ({
    id: agent.id,
    name: agent.name,
    description: agent.description,
    email: agent.email,
    phoneNumber: agent.phoneNumber,
    actions: [
      {
        icon: 'edit',
        tooltipText: 'Edit',
        onClick: () => navigateToUpdateView(agent),
        show: userHasPermission({ permission: 'agent:update', data: agent }),
      },
      {
        icon: 'trash-alt',
        tooltipText: 'Delete',
        onClick: () => handleDelete(agent),
        show: userHasPermission({ permission: 'agent:delete', data: agent }),
      },
    ],
  }));

  const customRenderers: CustomRenderer<AgentTableItem>[] = [
    {
      key: 'actions',
      renderer: ({ actions }: AgentTableItem) => (
        <Dropdown align='end' onClick={e => e.stopPropagation()} flip={false}>
          <Dropdown.Toggle>
            <FontAwesomeIcon icon={['fas', 'ellipsis-h']} />
          </Dropdown.Toggle>

          <Dropdown.Menu flip={false} align="start">
            {actions.map(action => (
              <Dropdown.Item {...action}>
                {action.tooltipText}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

      ),
    },
    {
      key: 'phoneNumber',
      renderer: ({ phoneNumber }) => (
        <a onClick={e => e.stopPropagation()} href={`tel:${phoneNumber}`}>
          {formatPhoneNumber(phoneNumber)}
        </a>
      ),
    },
    {
      key: 'email',
      renderer: ({ email }) => (
        <a onClick={e => e.stopPropagation()} href={`mailto:${email}`}>
          {email}
        </a>
      ),
    }
  ];

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Agent List</h1>
          <Link to='/'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Dashboard
          </Link>
        </div>
        <HasPermission perform='agent:create'>
          <div className='text-end'>
            <Link to='/agents/create-agent'>
              <CreateButton>Add Agent</CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>

      <TableCard>
        <Card.Body>
          <WithLoadingOverlay isLoading={isLoadingAgents}>
          {items.length ? (
            <>
              <FilterHeader className='mb-3'>
                <InputGroup>
                  <DropdownButton
                    variant="secondary"
                    title="Filter"
                  >
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else here</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Separated link</Dropdown.Item>
                  </DropdownButton>
                  <FormControl placeholder="Search by name, description, email or phone..." aria-label="Text input with dropdown button" />
                </InputGroup>
              </FilterHeader>
              <GenericTable<AgentTableItem> headers={headers} onRowClick={item => history.push(`/agents/update-agent/${item.id}`)} items={items} customRenderers={customRenderers} />
            </>
          ) : (
            <NoContent>
              <FontAwesomeIcon size='2x' icon={['fas', 'ban']} />
              <p className='lead'>No Agents</p>
              <Link to='/agents/create-agent'>
                <CreateButton variant='secondary'>Add Agent</CreateButton>
              </Link>
            </NoContent>
          )}
          </WithLoadingOverlay>
        </Card.Body>
      </TableCard>

      <ConfirmationModal />
    </Container>
  );
};
