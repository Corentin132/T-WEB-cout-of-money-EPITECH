interface CryptoAboutTextProps {
  /**
   * Is the title
   * @type {string}
   */
  title: string;

  /**
   * Is the text
   * @type {string}
   */
  text: string;
}

function CryptoAboutText({ title, text }: CryptoAboutTextProps) {
  return (
    <div className="flex flex-col w-full px-4 gap-1">
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-justify">{text}</p>
    </div>
  );
}

export default CryptoAboutText;
