import MenuItem from './menu-item';

export default function NavBar({ children }) {
  return (
    <>
      <div className="text-sm text-gray-100 font-bold hidden lg:flex">
        <MenuItem link="/">
          Search
        </MenuItem>
      </div>

      <div className="flex items-center lg:hidden">
        <div className="block lg:hidden">
          {/* TODO Expand menu to show options*/}
          <button className="flex items-center px-4 py-3 border rounded text-gray-300 border-gray-300 font-bold focus:outline-none">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <title>Menu</title>
                  <path
                    d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
                    stroke='#fff'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
              </svg>
          </button>
        </div>
      </div>
    </>
  )
};
