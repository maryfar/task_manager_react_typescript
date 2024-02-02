import React from "react";


interface ErrorsListProps {
  messages: string[] | string;
}

const ErrorsList: React.FC<ErrorsListProps> = ({ messages }) => {
  return (
    <>
      {Array.isArray(messages) ? (
        messages.map((msg, index) => (
          <p key={index} className="mt-1 text-sm text-gray-500 capitalize">
            {msg}
          </p>
        ))
      ) : (
        <p className="mt-1 text-sm text-gray-500 capitalize">{messages}</p>
      )}
    </>
  );
};

export default ErrorsList;

type Props = {
  errorsList: string[] | string;
  showtoast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ErrorToast: React.FC<Props> = ({ errorsList, showtoast, setShowToast }) => {
  return showtoast ? (
    <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">Error</p>
                <ErrorsList messages={errorsList} />
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  onClick={() => setShowToast(false)}
                  type="button"
                  className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};