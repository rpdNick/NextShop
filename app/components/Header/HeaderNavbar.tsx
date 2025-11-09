import { LayoutGrid } from 'lucide-react';

export default function HeaderNavbar() {
  return (
    <nav className="navbar relative navbar-expand-lg hidden lg:flex lg:flex-wrap items-center content-between text-black navbar-default pb-4">
      <div className="container max-w-7xl mx-auto w-full xl:px-4 lg:px-0">
        <div className="dropdown hidden lg:flex lg:items-center lg:justify-center">
          <button className="mr-4 btn inline-flex items-center gap-x-2 bg-green-600 text-white border-green-600 disabled:opacity-50 disabled:pointer-events-none hover:text-white hover:bg-green-700 hover:border-green-700 active:bg-green-700 active:border-green-700 focus:outline-none focus:ring-4 focus:ring-green-300" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <span>
              <LayoutGrid size={16} />
            </span>
            All Departments
          </button>
          <div>
            <ul className="navbar-nav lg:flex gap-3 lg:items-center">
              <li className="nav-item dropdown w-full lg:w-auto">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Home
                </a>
              </li>
              <li className="nav-item dropdown w-full lg:w-auto">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Shop
                </a>
              </li>
              <li className="nav-item dropdown w-full lg:w-auto">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Stores
                </a>
              </li>
              <li className="nav-item dropdown w-full lg:w-auto dropdown-fullwidth">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Mega menu
                </a>
              </li>
              <li className="nav-item dropdown w-full lg:w-auto">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Pages
                </a>
              </li>
              <li className="nav-item dropdown w-full lg:w-auto">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Account
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
