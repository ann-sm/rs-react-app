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
        <button onClick={() => setModalType('Uncontrolled')}>
          Uncontrolled form
        </button>
        <button onClick={() => setModalType('RHF')}>React Hook Form</button>
      </header>
      <main>
        <h2>Submissions</h2>
      </main>
      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        <h3>
          {modalType === 'Uncontrolled'
            ? 'Uncontrolled Form'
            : 'React Hook Form'}
        </h3>
        <button type="button" onClick={handleClose}>
          x
        </button>
        {modalType === 'Uncontrolled' && <UncontrolledForm />}
        {modalType === 'RHF' && <RHForm />}
      </Modal>
    </>
  );
};

export default App;
