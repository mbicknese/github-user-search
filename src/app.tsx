import './apollo';
import { useState } from 'preact/compat';
import { searchUser } from './search';

export const App = () => {
    const [userCount, setUserCount] = useState(0);

    const handleSearchChange = (event: JSX.TargetedEvent<HTMLInputElement, Event>) => {
        updateUserCountForSearchQuery(event.currentTarget.value);
    };
    const updateUserCountForSearchQuery = async (query: string) => {
        const result = await searchUser(query);
        setUserCount(result.userCount);
    };

    return (
        <>
            <p>This will become a great application!</p>
            <input type="text" onChange={handleSearchChange} />
            <p>{userCount} user(s) found </p>
        </>
    );
};
