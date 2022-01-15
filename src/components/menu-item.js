export default function MenuItem({ children, link, last }) {
  return (
    <a href={link} className={`block mt-4 lg:inline-block text-white hover:text-gray-200 lg:mt-0 ${last ? "" : "mr-10"}`}
  >
      {children}
    </a>
  )
};
