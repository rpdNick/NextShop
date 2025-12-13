'use client';

import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { CircleUser, ChevronDown } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useModal } from '../Modal/ModalContext';
import LoginModal from '../Modals/sign_in';
import RegisterModal from '../Modals/sign_up';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { clearUser } from '@/lib/store/slices/authSlice';

export default function UserMenu() {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const { openModal } = useModal();
  const router = useRouter();

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

  const displayName = user.displayName ?? 'User';
  const avatar = user.photoURL ? (
    <Image 
      src={user.photoURL} 
      alt={displayName} 
      width={32} 
      height={32} 
      className="rounded-full object-cover" 
    />
  ) : (
    <CircleUser className="h-6 w-6 text-gray-600" />
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer">
        {avatar}
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black/5 focus:outline-none overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <Image 
                  src={user.photoURL} 
                  alt={displayName} 
                  width={40} 
                  height={40} 
                  className="rounded-full object-cover border border-gray-200" 
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <CircleUser className="h-5 w-5 text-gray-500" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                {user.email && (
                  <p className="text-xs text-gray-500 truncate" title={user.email}>
                    {user.email}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push('/profile')}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full px-4 py-2 text-left text-sm cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </div>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => router.push('/profile/orders')}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full px-4 py-2 text-left text-sm cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Orders
                  </div>
                </button>
              )}
            </Menu.Item>
            <div className="my-1 h-px bg-gray-100" />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block w-full px-4 py-2 text-left text-sm cursor-pointer text-red-600`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Sign out
                  </div>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
