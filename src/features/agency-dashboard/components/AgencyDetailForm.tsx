import { yupResolver } from '@hookform/resolvers/yup';
import { Agency } from 'common/models';
import { SubmitButton } from 'common/styles/button';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export type FormData = Pick<Agency, 'agencyName'>;

export type Props = {
  defaultValues?: FormData;
  submitButtonLabel?: string;
  onSubmit: (data: FormData) => void;
};

const schema = yup.object().shape({
  agencyName: yup.string().required('Agency Name is required.'),
});

export const AgencyDetailForm: FC<Props> = ({
  defaultValues = {},
  submitButtonLabel = 'SUBMIT',
  onSubmit,
}) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: 'all', defaultValues });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-agency-form-agency-name'>
        <Form.Label>Agency Name</Form.Label>
        <Form.Control type='text' isInvalid={!!errors.agencyName} {...register('agencyName')} />
        <Form.Control.Feedback type='invalid'>{errors.agencyName?.message}</Form.Control.Feedback>
      </Form.Group>
      <SubmitButton type='submit' className='mt-3' disabled={!isValid}>
        {submitButtonLabel}
      </SubmitButton>
    </Form>
  );
};
