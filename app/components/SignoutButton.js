// components/LogoutButton.js

import {useRouter} from 'next/navigation';

const LogoutButton = () => {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return <button onClick={handleLogout}>Sign out</button>;
};

export default LogoutButton;
