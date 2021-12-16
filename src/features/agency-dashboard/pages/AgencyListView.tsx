import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteAgencyMutation, useGetAgenciesQuery } from 'common/api/agencyApi';
import { PageHeader, TableCard } from 'common/components/Common';
import { WithLoadingOverlay } from 'common/components/LoadingSpinner';
import { useConfirmationModal } from 'common/hooks';
import { Agency } from 'common/models';
import * as notificationService from 'common/services/notification';
import { CreateButton } from 'common/styles/button';
import { HasPermission, useRbac } from 'features/rbac';
import moment from 'moment';
import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const AgencyDetail = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h2 {
    flex: 1;
    font-size: 1.2rem;
    margin-left: 1rem;

    span {
      display: block;
      font-size: 0.8rem;
      color: #999;
    }
  }
  & > div {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 0 1.5rem;
    background: ${props => props.theme.colors.lightAccent};
    text-align: center;
    span {
      display: block;
      font-size: 0.8rem;
      color: #11648f;
      text-transform: uppercase;
      margin-top: -10px;
      letter-spacing: 2px;
      font-weight: normal;
    }
    p {
      color: #11648f;
      font-weight: 600;
      font-size: 3rem;
      display: inline-block;
    }
  }
`;

export const AgencyListView: FC = () => {
  const history = useHistory();
  const { userHasPermission } = useRbac();
  const { data: agencies = [], isLoading: isLoadingAgencies } = useGetAgenciesQuery();
  const [deleteAgency] = useDeleteAgencyMutation();
  const { Modal: ConfirmationModal, openModal, closeModal } = useConfirmationModal();

  const handleDelete = (agency: Agency) => {
    const message = `Delete ${agency.agencyName}?`;

    const onConfirm = () => {
      deleteAgency(agency.id);
      closeModal();
      notificationService.showSuccessMessage('Agency deleted.');
    };

    const onCancel = () => closeModal();

    openModal(message, onConfirm, onCancel);
  };

  return (
    <Container>
      <PageHeader>
        <div>
          <h1>Agency List</h1>
          <Link to='/'>
            <FontAwesomeIcon icon={["fas", "chevron-left"]} />  Back to Dashboard
          </Link>
        </div>
        <HasPermission perform='agency:create'>
          <div>
            <Link to='/agencies/create-agency'>
              <CreateButton>Add Agency</CreateButton>
            </Link>
          </div>
        </HasPermission>
      </PageHeader>

      <WithLoadingOverlay isLoading={isLoadingAgencies}>
        <Row>
          {agencies.map((item) => (
            <Col xs={4}>
              <TableCard onClick={() => history.push(`/agencies/update-agency/${item.id}`)} className='mb-3'>
                <AgencyDetail>
                  <h2>
                    {item.agencyName}
                    <span>{moment(item.createdAt).format('LL')}</span>
                  </h2>
                  <div>
                    <p>
                      {item.userCount}
                      <span>User{item.userCount === 1 ? '' : 's'}</span>
                    </p>
                  </div>
                </AgencyDetail>
              </TableCard>
            </Col>
          ))}
        </Row>
      </WithLoadingOverlay>
      <ConfirmationModal />
    </Container>
  );
};
