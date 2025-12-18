'use client';

import { Fragment, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '../SearchBar/SearchBar';
import { TextAlignJustify, Heart, Handbag } from 'lucide-react';
import Navbar from '../Navbar/Navbar';
import UserMenu from './UserMenu';

const languages = ['EN', 'UK'];

export default function Header() {
  const [lang, setLang] = useState('EN');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

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
                  <Listbox value={lang} onChange={setLang}>
                    <div className="relative">
                      <Listbox.Button className="inline-flex items-center gap-1 text-sm font-medium cursor-pointer">
                        <span className="mr-1">{lang}</span>
                        <ChevronDown className="h-4 w-4 opacity-70" aria-hidden="true" />
                      </Listbox.Button>
                      <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <Listbox.Options className="absolute right-0 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                          {languages.map((language) => (
                            <Listbox.Option key={language} value={language} className={({ active }) => `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'}`}>
                              {({ selected }) => (
                                <>
                                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{language}</span>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="container">
            <div className="flex flex-wrap w-full items-center justify-between">
              <div className="lg:w-1/6 md:w-1/2 w-2/5">
                <div className="flex items-center justify-start gap-2.5">
                  <button className="d-none d-lg-block cursor-pointer navbar-toggler" type="button" onClick={() => setIsNavbarOpen(true)}>
                    <TextAlignJustify className="text-primary" />
                  </button>
                  <Link href="/" className="flex items-center">
                    <Image src="/freshcart-logo.svg" alt="Logo" width={160} height={31} />
                  </Link>
                </div>
              </div>
              <div className="lg:w-3/5 hidden lg:block">
                <SearchBar />
              </div>
              <div className="flex gap-7 items-center justify-end">
                <div className="flex gap-7 items-center justify-end">
                  <div>
                    <Link href="/" className="flex items-center">
                      <Heart className="size={24} text-gray-600 hover:text-primary" />
                    </Link>
                  </div>
                  <UserMenu />
                  <div>
                    <Link href="/" className="shop_cart flex items-center">
                      <Handbag className="size={24} text-gray-600 hover:text-primary" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>{isNavbarOpen && <Navbar onClose={() => setIsNavbarOpen(false)} />}</AnimatePresence>
    </header>
  );
}
