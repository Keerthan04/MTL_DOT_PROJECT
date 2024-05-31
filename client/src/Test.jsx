import Navbar from "./components/Navbar";


function Test(){

    return (
        <>
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-neutral-800 border-b border-neutral-700 text-sm py-3 sm:py-0">
  <nav className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
    <div className="flex items-center justify-between">
      <a className="flex-none text-xl font-semibold text-white" href="#" aria-label="Brand">Brand</a>
      <div className="sm:hidden">
        <button type="button" className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-neutral-700 text-white hover:bg-neutral-700 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
          <svg className="hs-collapse-open:hidden size-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
          </svg>
          <svg className="hs-collapse-open:block flex-shrink-0 hidden size-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </div>
    <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
        <a className="py-3 ps-px sm:px-3 font-medium text-blue-600" href="#" aria-current="page">Landing</a>
        <a className="py-3 ps-px sm:px-3 font-medium text-neutral-400 hover:text-neutral-500" href="#">Account</a>
        <a className="py-3 ps-px sm:px-3 font-medium text-neutral-400 hover:text-neutral-500" href="#">Work</a>
        <a className="py-3 ps-px sm:px-3 font-medium text-neutral-400 hover:text-neutral-500" href="#">Blog</a>
        
        <div className="hs-dropdown [--strategy:static] sm:[--strategy:fixed] [--adaptive:none] sm:[--trigger:hover] py-3 ps-px sm:px-3">
          <button type="button" className="flex items-center w-full text-neutral-400 hover:text-neutral-500 font-medium">
            Get Started
            <svg className="ms-2 size-2.5 text-neutral-500" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
            </svg>
          </button>
          <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 bg-neutral-800 sm:shadow-md rounded-lg p-2 sm:border dark:border-neutral-700 dark:divide-neutral-700 before:absolute top-full sm:border before:-top-5 before:start-0 before:w-full before:h-5">
            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300" href="#">
              Entry
            </a>
            <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-neutral-400 hover:bg-neutral-700 hover:text-neutral-300" href="#">
              Report
            </a>
          </div>
        </div>
        
        <a className="py-3 ps-px sm:px-3 font-medium text-blue-600" href="#">Home</a>
        <a className="flex items-center gap-x-2 font-medium text-neutral-400 hover:text-blue-600 sm:border-s sm:border-neutral-700 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6" href="#">
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
          </svg>
          Log in
        </a>
      </div>
    </div>
  </nav>
</header>

      <Navbar />
      </>
    )
}

export default Test;
