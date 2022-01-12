import { useAppDispatch } from 'app/redux';
import { useState } from 'react';
import { confirmationModalSlice } from './slice';

interface OpenModalConfig {
    message?: string;
    cancelButtonLabel?: string;
    confirmButtonLabel?: string; 
    onConfirm?: () => void;
    onCancel?: () => void
}

export interface ConfirmationModalManager {
  /**
   * Opens the modal.
   *
   * @param {string} message - Confirmation message to displayed in the modal.
   * @param {OnConfirmCallback} onConfirm - Function to call if a user clicks the confirm button.
   * @param {OnCancelCallback} onCancel - Function to call if a user clicks the cancel button.
   */
  openModal: (config: OpenModalConfig) => void;

  /**
   * Closes the modal.
   */
  closeModal: () => void;

  /**
   * Set the loading state of the modal.
   */
   setIsLoading: (loading: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const NoOp = () => {}

export type UseConfirmatioModal = () => ConfirmationModalManager;

export const useConfirmationModal: UseConfirmatioModal = () => {
    const dispatch = useAppDispatch();
    const [onConfirm, setOnConfirm] = useState(() => NoOp);
    const [onCancel, setOnCancel] = useState(() => NoOp);

    const openModal = ({message, cancelButtonLabel, confirmButtonLabel, onConfirm, onCancel}: OpenModalConfig) => {
        setOnConfirm(() => onConfirm);
        setOnCancel(() => onCancel);
        dispatch(confirmationModalSlice.actions.modalOpened({
            message,
            cancelButtonLabel,
            confirmButtonLabel,
        }))
    }

    const closeModal = () => {
        dispatch(confirmationModalSlice.actions.modalClosed());
    }

    return {
        openModal,
        closeModal,
        setIsLoading: () => { 
            //
        },
    }
}
