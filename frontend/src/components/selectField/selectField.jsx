/* eslint-disable react/prop-types */
"use client";

import {  useState } from "react";
import {
  // Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Icons from "../../assets/icons";



const SelectField = ({ languages,handleLanguageChange,defaultLanguage }) => {


  const [selected, setSelected] = useState(
    () => languages.find(lang => lang.value === defaultLanguage) || languages[3]
  );

  return (
    <Listbox value={selected} onChange={setSelected}>
      {/* <Label className="block text-sm/6 font-medium text-gray-900">Assigned to</Label> */}
      <div className="relative ">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md shadow-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 ">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span
              aria-label={selected.online ? "Online" : "Offline"}
              //   className={classNames(
              //     selected.online ? 'bg-green-400 forced-colors:bg-[Highlight]' : 'bg-gray-200',
              //     'inline-block size-2 shrink-0 rounded-full border border-transparent',
              //   )}
            >
              <img src={selected.flag} alt="flag" className="h-6 w-6" />
            </span>
            <span className="block truncate">{selected.name}</span>
          </span>
          <Icons.IoIosArrowDown
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end  sm:size-4 outline-none"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {languages.map((person) => (
            <ListboxOption
              key={person.id}
              value={person}
              onClick={() => handleLanguageChange(person.value)}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
            >
              <div className="flex items-center">
                <span
                  aria-label="true"
                  //   className={classNames(
                  //     selected.online ? 'bg-green-400 forced-colors:bg-[Highlight]' : 'bg-gray-200',
                  //     'inline-block size-2 shrink-0 rounded-full border border-transparent',
                  //   )}
                >
                  <img src={person.flag} alt="flag" className="h-6 w-6 object-cover" />
                </span>
                <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                  {person.name}
                  {/* <span className="sr-only">
                    {" "}
                    is {person.online ? "online" : "offline"}
                  </span> */}
                </span>
              </div>

              {/* <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span> */}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};
export default SelectField;
