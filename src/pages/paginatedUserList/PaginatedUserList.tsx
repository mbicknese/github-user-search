import { useState } from 'preact/compat';
import { DelayedInput, Pagination, UserCard } from '../../components';
import { searchUsers } from '../../github';
import { CursorList, User } from '../../models';
import style from './PaginatedUserList.module.css';

type PageInfo = { current: number; cursors: CursorList };

/**
 * Renders a search field and a list of users matching given query
 */
const PaginatedUserList = () => {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [pageInfo, setPageInfo] = useState<PageInfo>({
        current: 1,
        cursors: new CursorList([]),
    });
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePageChange = (page: number) => {
        updateState(null, pageInfo.cursors.at(page), page);
    };
    const handleSearchChange = (query: string) => {
        updateState(query);
    };
    const updateState = async (
        newQuery: string | null,
        after?: string | null,
        page: number = 1
    ) => {
        setLoading(true);
        if (newQuery) {
            setUsers([]);
        }

        const { users, userCount, cursors } = await searchUsers(newQuery || query, 5, 15, after);
        setUsers(users);
        setUserCount(userCount);
        setQuery(newQuery || query);
        setPageInfo({
            current: page,
            cursors: newQuery ? cursors : pageInfo.cursors.merge(cursors),
        });
        setLoading(false);
    };

    return (
        <main class={style.this}>
            <p class={style.intro}>
                A "simple" tool to search GitHub users. Provided search query will be tried to match
                some fields, as dictated by GitHub. Under the hood it uses the GraphQL API.
            </p>
            <DelayedInput onInput={handleSearchChange} placeholder="search" />

            {users.length > 0 ? (
                <section>
                    <p>
                        Found {userCount} user{userCount === 1 ? '' : 's'} or organisation
                        {userCount === 1 ? '' : 's'}
                    </p>
                    {users.map((user: User) => (
                        <UserCard user={user} />
                    ))}
                    <Pagination
                        current={pageInfo.current}
                        perPage={5}
                        total={userCount}
                        onPageChange={handlePageChange}
                    />
                </section>
            ) : loading ? (
                <p>loading ...</p>
            ) : query ? (
                <p>No results</p>
            ) : (
                <p>Type a query to get started</p>
            )}
        </main>
    );
};

export default PaginatedUserList;
