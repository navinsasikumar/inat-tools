import Header from './header';

export const siteTitle = 'iNat Tools';

export default function Layout({
  children,
}) {
  return (
    <div>
      <Header></Header>
      <div className="bg-zinc-800">
        {children}
      </div>
    </div>
  );
};
