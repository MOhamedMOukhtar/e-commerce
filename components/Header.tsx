import { Globe } from "lucide-react";

function MainHeader() {
  return (
    <nav className="bg-black px-10 py-3 text-white">
      <div className="flex cursor-pointer gap-3 hover:underline">
        <Globe />
        <div>
          <span className="pr-2">EG</span>
          <span className="border-l border-l-white pl-2">English</span>
        </div>
      </div>
    </nav>
  );
}

export default MainHeader;
