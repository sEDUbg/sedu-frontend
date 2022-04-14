const Error404 = () => (
    <div className="dark:text-white h-full w-full flex flex-col justify-center items-center p-56 space-y-5">
        <h1 className="text-8xl font-black">404</h1>
        <p className="text-3xl font-bold">Page not found</p>
    </div>
);


const Error500 = () => (
    <div>
        <h1>500</h1>
        <p>Internal server error</p>
    </div>
);


export { Error404 , Error500 };