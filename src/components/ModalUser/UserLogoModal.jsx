import { useState } from 'react';
import { Div, Button } from './UserLogoModal.styled';
import SettingModal from './SettingModal';
import UserLogoutModal from './UserLogoutModal';

const UserLogoModal = () => {
  const [isOpenUserInfoModal, setOpenUserInfoModal] = useState(false);
  const [isOpenUserLogoutModal, setOpenUserLogoutModal] = useState(false);

  const openUserInfoModal = () => {
    setOpenUserInfoModal(true);
  };
  const openUserLogoutModal = () => {
    setOpenUserLogoutModal(true);
  };

  const closeUserInfoModal = () => {
    setOpenUserInfoModal(false);
  };

  const closeUserLogoutModal = () => {
    setOpenUserLogoutModal(false);
  };

  return (
    <>
      <Div>
        <Button onClick={openUserInfoModal}>Settings</Button>
        <Button onClick={openUserLogoutModal}>Logout</Button>
      </Div>
      {/* Модальне вікно для settings */}
      {isOpenUserInfoModal ?? <SettingModal onClose={closeUserInfoModal} />}

      {/* Модальне вікно для logout */}
      {isOpenUserLogoutModal ?? (
        <UserLogoutModal onClose={closeUserLogoutModal} />
      )}
    </>
  );
};

export default UserLogoModal;
