'use client';

import { useState } from 'react';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '../dropdown';
import HeaderNavbar from '../Header/HeaderNavbar';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../SearchBar/SearchBar';
import { Heart, User, Handbag } from 'lucide-react';
import LoginModal from '../Modals/sign_in';
import RegisterModal from '../Modals/sign_up';
import { useModal } from '../Modal/ModalContext';

export default function Header() {
  const [lang, setLang] = useState('EN');
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
  return (
    <header>
      <div className="border-b border-b-gray-300">
        <div className="bg-gray-100 py-1">
          <div className="container m-auto">
            <div className="flex flex-wrap">
              <div className="md:w-1/2 w-full text-center md:text-left">
                <span>Super Value Deals - Save more with coupons</span>
              </div>
              <div className="w-1/2 text-right hidden lg:block">
                <div className="dropdown flex justify-end">
                  <Dropdown>
                    <DropdownButton>
                      <span className="mr-1">{lang}</span>
                    </DropdownButton>
                    <DropdownMenu>
                      <DropdownItem onClick={() => setLang('EN')}>EN</DropdownItem>
                      <DropdownItem onClick={() => setLang('DE')}>DE</DropdownItem>
                      <DropdownItem onClick={() => setLang('UK')}>UK</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="container">
            <div className="flex flex-wrap w-full items-center justify-between">
              <div className="lg:w-1/6 md:w-1/2 w-2/5">
                <Link href="/" className="flex items-center">
                  <Image src="/freshcart-logo.svg" alt="Logo" width={160} height={31} />
                </Link>
              </div>
              <div className="lg:w-2/5 hidden lg:block">
                <SearchBar />
              </div>
              <div className="lg:w-1/5 hidden lg:block">
                <button type="button" className="btn gap-x-2 bg-transparent text-gray-600 border-gray-300 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-gray-700 hover:border-gray-700 active:bg-gray-700 active:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300">
                  <span className="flex items-center gap-1">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-map-pin" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </span>
                    <span>Location</span>
                  </span>
                </button>
              </div>
              <div className="flex gap-7 items-center justify-end">
                <div className="flex gap-7 items-center justify-end">
                  <div>
                    <Link href="/" className="flex items-center">
                      <Heart className="size={24} text-gray-400" />
                    </Link>
                  </div>
                  <div>
                    <button onClick={openLogin} className="sign_up flex items-center cursor-pointer">
                      <User className="size={24} text-gray-400" />
                    </button>
                  </div>
                  <div>
                    <Link href="/" className="shop_cart flex items-center">
                      <Handbag className="size={24} text-gray-400" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HeaderNavbar />
      </div>
    </header>
  );
}
