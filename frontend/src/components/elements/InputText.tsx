import TextField from "@mui/material/TextField";

interface InputTextProps {
  /**
   * Is the input label
   * @type {string}
   */
  label: string;

  /**
   * Is the input type. For example, email, password, text...
   * @type {string}
   */
  type: string;

  /**
   * Is the input value
   * @type {string}
   */
  value: string;

  /**
   * Is the input required
   * @type {boolean}
   */
  isRequired: boolean;

  /**
   * Is the event to be triggered with the onchange callback of the input
   * @param event is the html input element event with the inout value
   * @returns void
   */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Is the input optional hint
   * @type {string | undefined}
   */
  hint?: string | undefined;

  /**
   * Is the input opitional style in tailwind format.
   * @type {string | undefined}
   */
  className?: string | undefined;
}

function InputText({
  label,
  type,
  value,
  isRequired,
  onChange,
  hint,
  className,
}: InputTextProps) {
  return (
    <TextField
      required={isRequired}
      label={label}
      type={type}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={hint}
      className={`${className ? className : "rounded-lg w-full "}`}
    />
  );
}

export default InputText;
