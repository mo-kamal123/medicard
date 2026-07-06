const FormTextarea = ({
    label,
    placeholder,
    rows = 5,
    ...props
  }) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-900">
          {label}
        </label>
  
        <textarea
          rows={rows}
          placeholder={placeholder}
          className="w-full rounded-xl bg-white border border-gray-200 px-4 py-3 outline-none resize-none focus:border-main"
          {...props}
        />
      </div>
    );
  };
  
  export default FormTextarea;