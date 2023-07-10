import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

function App() {
  const [passwordLength, setPasswordLength] = useState(8);
  const [password, setPassword] = useState('');
  const [charset, setCharset] = useState({
    'Lowercase Letters': true,
    'Uppercase Letters': false,
    'Special Symbols': false,
    Numbers: false,
  });
  const [copied, setCopied] = useState(false);

  const onPasswordCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    toast('Password copied!', {
      icon: <CheckIcon className="h-4 w-4" />,
    });

    setTimeout(() => setCopied(false), 1000);
  };

  const onGeneratePassword = () => {
    const selectedCharset = Object.keys(charset).filter(
      (ch) => charset[ch] == true,
    );
    let charsetConc = '';
    let generatedPassword = '';

    selectedCharset.forEach((ch) => {
      switch (ch) {
        case 'Lowercase Letters':
          charsetConc += 'abcdefghijklmnopqrstuvwxyz';
          break;
        case 'Uppercase Letters':
          charsetConc += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          break;
        case 'Numbers':
          charsetConc += '0123456789';
          break;
        case 'Special Symbols':
          charsetConc += '!@#$^&()_';
          break;
      }
    });

    if (charsetConc.length > 0) {
      for (let i = 0; i < passwordLength; i++) {
        generatedPassword +=
          charsetConc[Math.floor(Math.random() * charsetConc.length)];
      }

      setPassword(generatedPassword);
      toast('Password generated successfully!', {
        icon: <CheckIcon className="h-4 w-4" />,
      });
    } else {
      toast('You must select atleast one option!', {
        icon: <XMarkIcon className="h-4 w-4" />,
      });
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col min-h-screen justify-center items-center text-slate-100">
      <h1 className="font-bold text-3xl mb-6">JPassword Generator</h1>
      <div className="bg-slate-600 p-2 rounded-md max-w-lg w-full flex flex-col">
        {password && (
          <div className="flex flex-row space-x-3 justify-center items-center p-2 mb-4">
            <p className="text-xl text-lime-500 self-center underline italic">
              {password}
            </p>
            {!copied && (
              <ClipboardDocumentIcon
                onClick={onPasswordCopy}
                className="h-6 w-6 hover:cursor-pointer hover:text-slate-400 transition duration-150"
              />
            )}
            {copied && (
              <ClipboardDocumentCheckIcon className="h-6 w-6 hover:cursor-pointer hover:text-slate-400 transition duration-150" />
            )}
          </div>
        )}
        <div className="mb-3 px-4">
          <label
            htmlFor="password-length"
            className="block mb-2 text-sm font-medium text-slate-100 dark:text-white"
          >
            Password length -{' '}
            <span className="text-slate-400 italic text-lg">
              {`{${passwordLength}}`}
            </span>
          </label>
          <input
            id="password-length"
            type="range"
            min="8"
            max="30"
            value={passwordLength}
            onChange={(e) => setPasswordLength(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <div className="px-4 flex flex-col space-y-3">
          {Object.keys(charset).map((ch, index) => (
            <div key={index} className="flex items-center">
              <input
                checked={charset[ch]}
                id={ch}
                name={ch}
                type="checkbox"
                onChange={(e) =>
                  setCharset({ ...charset, [ch]: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={ch}
                className="ml-2 text-sm font-medium dark:text-slate-100"
              >
                {ch}
              </label>
            </div>
          ))}
        </div>
        <div className="mt-8 mb-3 px-4">
          <button
            onClick={onGeneratePassword}
            className="w-full bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
