import  Nav  from "./Nav";
export default function Header() {
  return (
    <>
    <header className="header" dir="ltr">
      <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-center justify-center sm:justify-start gap-2">
          <h3 className=" text-surface ">
         Eye Test Validator & ContactLens Converter
        </h3>
        </div>
        <div className="flex justify-center sm:justify-start">
          <a href="/" className="p-0">
            <img  
              className="rounded-full bg-amber-200 border-2"
              src="/eye-test/logo.png"
              alt="logo"
              width={60}
              height={60}
              title="Eye Test Validator And Converter To ContactLens"
            />
      </a>
        </div>

      </div>
    </header>
    </>
  );
}
