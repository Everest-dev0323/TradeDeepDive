import React, { useEffect } from "react";
import { Link, Route, Router } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useCookies } from 'react-cookie';

import json from "../content.json";
import SwitchCookie from "./SwitchCookie";

type Props = {
  opened: boolean;
};

const ManageCookieModal: React.FC<Props> = ({ opened }) => {
  let [isOpen, setIsOpen] = useState(true);
  const [cookies, setCookie] = useCookies(['policy']);
  const [cookieStatus, setCookieStatus] = useState([true, true, true]);

  const setCookies = (index: number, status: boolean)=> {
    const array = [...cookieStatus]
    array[index] = status;
    setCookieStatus(array);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(opened);
  }, [opened]);

  return (
    <>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="absolute top-0 sm:right-0 mx-4 sm:m-auto sm:w-[550px] bg-[#02344a] py-6 px-10 text-left align-middle shadow-xl transition-all z-[1]">
              <div className="relative">
                <h3 className="text-lg font-medium leading-6 text-white">
                  Manage your privacy preferences
                </h3>
                <button
                  className="absolute top-1 right-1 w-[20px]"
                  type="button"
                  aria-label="close"
                  onClick={closeModal}
                >
                  <svg
                    className="fill-white MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="CloseIcon"
                  >
                    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                  </svg>
                </button>

                <div className="mt-4">
                  {json.map((data, index) => {
                    return (
                      <SwitchCookie
                        status={data.status}
                        title={data.title}
                        content={data.content}
                        index={index}
                        key={index}
                        cookie={setCookies}
                      />
                    );
                  })}
                </div>
                <a target={"_blank"} href="/cookie-policy" className="block my-9 text-[#02698a]">
                  More information about Cookies Policy &nbsp;{" "}
                  <span>
                    <svg
                      className="fill-[#02698a] inline"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 16v-11l-1 1v9h-12v-12h9l1-1h-11v14z" />
                      <path d="M16 0h-5l1.8 1.8-6.8 6.8 1.4 1.4 6.8-6.8 1.8 1.8z" />
                    </svg>
                  </span>
                </a>
                <div className="flex justify-end flex-wrap space-x-2 sm:space-x-11">
                  <button
                    type="button"
                    className="justify-center rounded-[20px] border-2 border-[#259ae9] bg-none px-4 py-2 text-sm font-medium text-[#259ae9] w-[160px] sm:w-[170px] focus:outline-none"
                    onClick={()=> {  if(cookieStatus[0]||cookieStatus[1]||cookieStatus[2]) setCookie('policy', cookieStatus[0]||cookieStatus[1]||cookieStatus[2], { path: '/' }); closeModal();}}
                  >
                    Save preferences
                  </button>
                  <button
                    type="button"
                    onClick={()=> { setCookie('policy', true, { path: '/' }); closeModal();}}
                    className="justify-center rounded-[20px] bg-none px-4 py-2 text-sm font-medium bg-[#2aa8ff] text-white focus:outline-none"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Transition>
      )}
    </>
  );
};

export default ManageCookieModal;
