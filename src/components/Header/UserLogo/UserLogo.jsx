import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/auth/selectors';
import UserLogoModal from 'components/ModalUser/UserLogoModal';
import {
  UserAvatar,
  UserName,
  UserLogoBtn,
  UserLogoText,
  UserLogoIcon,
  UserLogoContainer,
} from './UserLogo.styled';
import sprite from '../../../img/sprite.svg';
import { rotate180DegVariants } from './rotateanimation';

const UserLogo = () => {
  const userProfile = useSelector(selectUser);
  const name = userProfile?.userName;
  const avatar = userProfile?.avatarURL;
  const defaultName = name ? name.slice(0, 1).toUpperCase() : 'V';

  //   const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = e => {
    setIsOpen(!isOpen);
    e.stopPropagation();
  };

  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    const closeModal = e => {
      if (
        e.target.className !== 'sc-hLQSwg fhncXH' &&
        e.target.className !== 'sc-dmyCSP NBJoq'
      ) {
        setIsOpen(false);
      }
    };
    //  const closeModal = e => {
    //    if (modalRef.current && !modalRef.current.contains(e.target)) {
    //      setIsOpen(false);
    //    }
    //  };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.addEventListener('click', closeModal);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('click', closeModal);
    };
  }, [isOpen, setIsOpen]);

  return (
    <UserLogoContainer>
      <UserLogoBtn
        onClick={e => handleButtonClick(e)}
        //   ref={modalRef}
        aria-label="User Logo"
      >
        <UserName>{name}</UserName>
        {avatar ? (
          <UserAvatar src={avatar} alt="Avatar" />
        ) : (
          <UserLogoText>
            <p>{defaultName}</p>
          </UserLogoText>
        )}
        <UserLogoIcon
          variants={rotate180DegVariants}
          animate={isOpen ? 'rotate' : 'stop'}
        >
          <svg>
            <use href={sprite + '#arrow-down'}></use>
          </svg>
        </UserLogoIcon>
      </UserLogoBtn>
      {isOpen && (
        <UserLogoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </UserLogoContainer>
  );
};

export default UserLogo;
