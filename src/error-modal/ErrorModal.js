import React, { PropTypes } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './ErrorModal.css';

const ErrorModal = ({ open, closeModal, text }) => {
	return (
		<Modal size="small" open={open} onClose={closeModal}>
			<Modal.Header>Error</Modal.Header>
			<Modal.Content>
				{text}
			</Modal.Content>
			<Modal.Actions>
				<Button positive onClick={closeModal}>
					OK
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

ErrorModal.propTypes = {
	open: PropTypes.bool.isRequired,
	closeModal: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired
};

export default ErrorModal;
