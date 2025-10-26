// src/components/layout/Header.tsxbun add gh-pages --dev


export default function Header() {
  return (
    <header className="header" dir="ltr">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex justify-center sm:justify-start">
          <a href="/" className="p-0">
            <img  
              className="rounded-full bg-amber-200 border-2"
              src="/logo.png"
              alt="logo"
              width={60}
              height={60}
              title="Eye Test Validator And Converter To ContactLens"
            />
      </a>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-2">
          <h2 className="text-2xl font-bold text-surface ">
          Solo Vision
        </h2>
        </div>
      </div>
    </header>
  );
}
