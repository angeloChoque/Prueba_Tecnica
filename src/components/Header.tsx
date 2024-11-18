import { Button } from "@/components/ui/button";
import { DATA_HEADER } from "@/data/HeaderData";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 w-full bg-header z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-6xl xl:px-0">
        <div className="flex items-center justify-between h-16 ">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="sr-only">Logo</span>
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </Link>
          </div>
          <div>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-7">
                {DATA_HEADER.map((data) => {
                  return (
                    <li key={`${data.path}-${data.title}`}>
                      <Link
                        to={data.path}
                        className=" hover:text-primary text-[20px]"
                      >
                        {data.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="flex items-center">
            <Button variant="outline" className="ml-4">
              Usuario
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
