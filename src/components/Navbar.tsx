
import { GoHome } from "react-icons/go";
import { MdPersonOutline } from "react-icons/md"

function Navbar() {
  return (
    <nav className="w-full flex justify-between px-10 py-4 bg-gray-900">
      <div className="flex gap-2">
        <p className="text-xl font-semibold">Video with AI</p>
        <span>
          <GoHome size={25} />
        </span>
      </div>

      <span><MdPersonOutline size={25}/></span>
    </nav>
  );
}

export default Navbar;
