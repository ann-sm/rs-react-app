import { useState } from 'react';
import Modal from './components/Modal/Modal';
import UncontrolledForm from './components/Forms/UncontrolledForm/UncontrolledForm';
import RHForm from './components/Forms/RHForm/RHForm';
import './App.css';

type ModalType = 'Uncontrolled' | 'RHF' | null;

const App = () => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleClose = () => setModalType(null);

  return (
    <>
      <header>
        <h1>React Forms App</h1>
        <div>
          <p>Choose a form type:</p>
          <div className="button-group">
            <button onClick={() => setModalType('Uncontrolled')}>
              Uncontrolled form
            </button>
            <button onClick={() => setModalType('RHF')}>React Hook Form</button>
          </div>
        </div>
      </header>
      <main>
        <h2>Submissions</h2>
      </main>
      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        <div className="modal-header">
          <h3>
            {modalType === 'Uncontrolled'
              ? 'Uncontrolled Form'
              : 'React Hook Form'}
          </h3>
          <button type="button" className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>
        {modalType === 'Uncontrolled' && <UncontrolledForm />}
        {modalType === 'RHF' && <RHForm />}
      </Modal>
    </>
  );
};

export default App;
