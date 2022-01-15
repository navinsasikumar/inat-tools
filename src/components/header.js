import NavBar from './navbar';
import { siteTitle } from './layout'

export default function Header({ children, hero }) {
  return (
    <header className="z-50">
      {hero ? (
        <nav className="flex items-center justify-between p-6">
          <div className="text-lg lg:text-2xl font-bold text-white">{hero === "home" ? "" : siteTitle }</div>
          <NavBar></NavBar>
        </nav>
      ) : (
        <nav className="flex items-center justify-between p-6 bg-gray-700">
          <div className="text-lg text-white">{siteTitle}</div>
          <NavBar></NavBar>
        </nav>
      ) }
    </header>
  )
};
