function Aside({ children }) {
  return (
    <aside className="lg:col-span-1 lg:block lg:space-y-8 col-span-full min-w-min md:grid space-y-8 md:space-y-0 grid-cols-3 gap-12 items-stretch ">
      {children}
    </aside>
  );
}

export default Aside;
