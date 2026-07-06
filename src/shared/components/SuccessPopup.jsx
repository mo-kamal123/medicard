const SuccessPopup = ({ title, message, buttonText, onButtonClick }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <div className="mx-4 w-full max-w-md rounded-3xl border border-[#D9E4F5] bg-white p-10 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <svg className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900">{title}</h2>

        {message && <p className="mb-8 text-gray-500">{message}</p>}

        {buttonText && (
          <button
            type="button"
            onClick={onButtonClick}
            className="w-full rounded-xl bg-main py-3 font-medium text-white transition hover:bg-sec"
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  )
}

export default SuccessPopup
