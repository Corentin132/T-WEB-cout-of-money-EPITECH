interface ButtonProps {
  /**
   * Is the button name
   * @type {string}
   */
  name: string;

  /**
   * Is the button type
   * @type {"button" | "submit" | "reset" | undefined}
   */
  type: "button" | "submit" | "reset" | undefined;

  /**
   * Is the button background color in tailwind format (bg-bluePrimary for example)
   * @type {string}
   */
  color: string;

  /**
   * Is the onCLick action
   * @type {() => void | undefined}
   */
  onClick?: () => void;

  /**
   * Is the input opitional style in tailwind format.
   * @type {string | undefined}
   */
  className?: string | undefined;

  /**
   * Is the icon svg associated to the button
   * @type {React.FunctionComponent}
   */
  IconSvg?: React.FunctionComponent;
}

function Button({
  name,
  type,
  color,
  onClick,
  className,
  IconSvg,
}: ButtonProps) {
  return (
    <>
      <button
        className={`${
          className ? className : ""
        } ${color} flex flex-row justify-center gap-5 text-white mobile:w-full px-9 py-3 rounded-lg hover:opacity-70`}
        type={type}
        onClick={onClick ? () => onClick() : undefined}
      >
        {IconSvg && <IconSvg />}
        {name}
      </button>
    </>
  );
}

export default Button;
