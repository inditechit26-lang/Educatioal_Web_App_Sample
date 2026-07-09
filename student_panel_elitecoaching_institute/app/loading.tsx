export default function Loading() {
  return (
    <div className="min-h-screen bg-canvas p-6 lg:pl-[294px]">
      <div className="mx-auto max-w-[1440px] animate-pulse">
        <div className="mb-7 h-8 w-40 rounded-lg bg-slate-200" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 h-[310px] rounded-2xl bg-white shadow-card lg:col-span-8" />
          <div className="col-span-12 h-[310px] rounded-2xl bg-white shadow-card lg:col-span-4" />
          <div className="col-span-12 mt-3 h-7 w-36 rounded-lg bg-slate-200" />
          {[1, 2, 3].map((item) => <div key={item} className="col-span-12 h-[310px] rounded-2xl bg-white shadow-card md:col-span-6 xl:col-span-4" />)}
        </div>
      </div>
    </div>
  );
}
