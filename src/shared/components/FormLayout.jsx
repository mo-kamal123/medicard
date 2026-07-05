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
        <d  iv className="flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {title && (
              <h1 className="mb-8 text-4xl font-bold text-gray-900">
                {title}
              </h1>
            )}

            {children}
          </div>
        </d>

        {/* Image Side */}
        <div className="relative hidden overflow-hidden lg:block">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />

          {/* Fade Effect */}
          <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
      </div>
    </div>
  );
};

export default FormLayout;