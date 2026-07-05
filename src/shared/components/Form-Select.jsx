// Select.jsx

const Select = ({
    label,
    options = [],
    error,
    className = "",
    ...props
  }) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
  
        <select
          {...props}
          className={`
            h-12 w-full rounded-xl border border-gray-300
            px-4 text-sm outline-none
            focus:border-blue-500
            ${className}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
  
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  };
  
  export default Select;