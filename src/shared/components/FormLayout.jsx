// FormLayout.jsx

const FormLayout = ({
  title,
  image,
  children,
}) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        
        {/* Form Side */}
        <div className="flex items-center justify-center p-4 md:p-8 lg:p-12">
          <div className="w-full md:w-[90%] max-w-lg">
            {title && (
              <h1 className="mb-6 md:mb-8 text-2xl md:text-4xl lg:text-[45px] font-semibold text-gray-900 leading-tight">
                {title}
              </h1>
            )}

            {children}
          </div>
        </div>

        {/* Image Side */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />

          {/* Fade Effect */}
          <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/80 to-transparent form-fade-left" />
          <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-l from-white via-white/80 to-transparent form-fade-right" />
        </div>
      </div>
    </div>
  );
};

export default FormLayout;