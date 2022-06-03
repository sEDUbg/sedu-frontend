import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const NavigationBar = (isLoggedInObject) => {


    const title = 'sEDUbg'
    const userID = sessionStorage.getItem('User ID');
    const isLoggedIn = isLoggedInObject.isLoggedIn;
    const navigation = (isLoggedIn) ? [
        { name: 'начало', href: '/', current: true },
        { name: 'презентации', href: '/presentations', current: false },
        { name: 'планове', href: '/plans', current: false },
        { name: 'материали', href: '/materials', current: false },
        { name: 'тренд', href: '/trending', current: false },
        { name: 'търси...', href: '/search', current: false },
    ] : [
        { name: 'начало', href: '/', current: true },
        { name: 'вход', href: '/login', current: false },
        { name: 'регистрация', href: '/register', current: false },
    ];

    let userLink = '/user/id=' + userID + '';
    //console.log(typeof userLink, 'haha', userID)
    //console.log(isLoggedIn)

    const userNavigation = (isLoggedIn) ? [
        { name: 'моя профил', href: userLink },
        { name: 'качване', href: '/upload' },
        { name: 'настройки', href: '#' },
        { name: 'излез', href: '/logout' },
    ] : null;
    const user = {
        name: sessionStorage.getItem('User Name'),
        email: sessionStorage.getItem('User Email'),
        imageUrl:
            sessionStorage.getItem('ImageUrl') || '/img/default.png',
    }
    const Usr = () => {

        if (isLoggedIn) return (
            <div className="ml-4 flex items-center md:ml-6">
                <button
                    type="button"
                    className="bg-gray-200 dark:bg-gray-800 p-1 rounded-full text-gray-700 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <Menu as="div" className="ml-3 relative">
                    <div>
                        <Menu.Button className="max-w-xs dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full border dark:border-slate-700" src={user.imageUrl} alt="" />
                        </Menu.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation?.map((item) => (
                                <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <Link
                                            to={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100' : '',
                                                'block px-4 py-2 text-sm text-gray-700'
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        );
        return null;
    }

    const MobileUsr = () => {
        if (isLoggedIn) return (
            <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                        type="button"
                        className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                    {userNavigation?.map((item) => (
                        <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                        >
                            {item.name}
                        </Disclosure.Button>
                    ))}
                </div>
            </div>
        );

        return null;
    }

    return (
        <Disclosure as="nav" className="bg-gray-100 dark:bg-slate-900 sticky top-0 z-50">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <Link to='/' className="flex items-center justify-center">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8"
                                            src="/sedubg.png"
                                            alt="sedubg logo"
                                        />
                                    </div>
                                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                        <h1 className="text-3xl font-black text-gray-900 dark:text-gray-100">{title}</h1>
                                    </div>
                                </Link>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-200 dark:bg-gray-900 text-black dark:text-white'
                                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white',
                                                    'px-3 py-2 rounded-md text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <Usr />
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <MobileUsr />
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}

export default NavigationBar;