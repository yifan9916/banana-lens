import { PaperPlane } from '../icons';

export const Contact = () => {
  return (
    <address>
      <a
        href="mailto:bananalens88@gmail.com"
        className="w-full border rounded-full p-2 pl-8 mt-5 text-gray-400 flex justify-between items-center"
      >
        Send me a message...
        <span className="bg-sky-600 rounded-full flex justify-center items-center p-2">
          <PaperPlane className="h-5 w-5 text-white -rotate-45" />
        </span>
      </a>
    </address>
  );
};
