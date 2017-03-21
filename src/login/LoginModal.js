import React, { PropTypes } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import './LoginModal.css';

const LoginModal = ({ open, closeModal }) => {
	return (
		<Modal size="small" open={open} onClose={closeModal}>
			<Modal.Header>Error</Modal.Header>
			<Modal.Content>
				Please check you credentials
			</Modal.Content>
			<Modal.Actions>
				<Button positive onClick={closeModal}>
					Yes
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

LoginModal.propTypes = {
	open: PropTypes.bool.isRequired
};

export default LoginModal;
