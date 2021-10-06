import { useState } from 'react';
import {
  ModalContainer,
  ModalBackdrop,
  Modal,
  CancelContainer,
  LogInRegister,
} from './UserStyles';
import CancelIcon from '@material-ui/icons/Cancel';
import Register from './register/Register';
import Login from './login/Login';

const User = ({ setIsRegister }) => {
  const [isLogin, setIsLogin] = useState(true);

  const closeRegister = () => setIsRegister(false);

  return (
    <ModalContainer>
      <ModalBackdrop onClick={closeRegister} />
      <Modal>
        <CancelContainer>
          <CancelIcon onClick={closeRegister} />
        </CancelContainer>
        {isLogin ? (
          <Login setIsRegister={setIsRegister} />
        ) : (
          <Register setIsRegister={setIsRegister} />
        )}
        {isLogin && (
          <p>
            Don't have an account yet?
            <LogInRegister onClick={() => setIsLogin(false)}>
              {' '}
              Register
            </LogInRegister>
          </p>
        )}
        {!isLogin && (
          <p>
            Already have an account?
            <LogInRegister onClick={() => setIsLogin(true)}>
              {' '}
              Log In
            </LogInRegister>
          </p>
        )}
      </Modal>
    </ModalContainer>
  );
};

export default User;
