import { twMerge } from 'tailwind-merge';

const InputBox = ({ value, onChange, placeholder, id, label, type="text", className, error, ...rest }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        { label }
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={twMerge(`w-full px-5 py-3 bg-gray-100 rounded-lg border ${ error ? "border-red-500": "border-gray-300" } outline-none text-sm font-normal`, className)}
        placeholder={ placeholder }
        aria-labelledby={id}
        aria-placeholder={placeholder}
        { ...rest }
      />
      {error && (
        <div className='flex items-center'>
          <span className='text-sm text-red-500 font-medium'>{ error }</span>
        </div>
      )}
    </div>
  );
};

export default InputBox;
