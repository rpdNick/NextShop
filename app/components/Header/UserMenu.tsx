'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CircleUser } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { Dropdown, DropdownButton, DropdownDivider, DropdownItem, DropdownMenu } from '../dropdown';
import { useModal } from '../Modal/ModalContext';
import LoginModal from '../Modals/sign_in';
import RegisterModal from '../Modals/sign_up';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { clearUser } from '@/lib/store/slices/authSlice';

export default function UserMenu() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { openModal } = useModal();

  const openLogin = () => {
    openModal(({ close }) => (
      <LoginModal
        onClose={close}
        onShowRegister={() => {
          close();
          openRegister();
        }}
      />
    ));
  };

  const openRegister = () => {
    openModal(({ close }) => (
      <RegisterModal
        onClose={close}
        onShowLogin={() => {
          close();
          openLogin();
        }}
      />
    ));
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  if (!user) {
    return (
      <button onClick={openLogin} className="sign_up flex items-center cursor-pointer">
        <CircleUser className="size={24} text-gray-600 hover:text-primary" />
      </button>
    );
  }

  const avatar = user.photoURL ? <Image src={user.photoURL} alt={user.displayName ?? 'User'} width={32} height={32} className="rounded-full object-cover" /> : <CircleUser className="h-6 w-6 text-gray-600" />;

  return (
    <Dropdown>
      <DropdownButton className="bg-white px-2 py-1 rounded-full shadow-sm border border-gray-200 hover:border-gray-300">
        <div className='flex flex-col items-center'>
          {avatar}
          <span className="text-sm text-gray-700">{user.displayName ?? user.email ?? 'Profile'}</span>
        </div>
      </DropdownButton>
      <DropdownMenu>
        <DropdownItem>
          <Link href="/profile" className="flex w-full">
            Profile
          </Link>
        </DropdownItem>
        <DropdownItem>
          <Link href="/profile/orders" className="flex w-full">
            Orders
          </Link>
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={handleSignOut}>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
