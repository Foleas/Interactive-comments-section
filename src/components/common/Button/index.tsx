interface ButtonProps {
  text: string;
  disabled: boolean;
  onClickHandler: () => void;
  customClass?: string;
}

const buttonClass =
  "transition-colors bg-blue-moderate hover:bg-blue-lightGrayish text-white font-medium py-3 px-5 rounded-md";

const Button = (props: ButtonProps) => {
  const { text, disabled, onClickHandler, customClass = "" } = props;
  return (
    <button
      className={`${buttonClass} ${
        disabled ? "cursor-not-allowed" : ""
      } ${customClass}`}
      disabled={disabled}
      onClick={() => onClickHandler()}
    >
      {text}
    </button>
  );
};

export default Button;
