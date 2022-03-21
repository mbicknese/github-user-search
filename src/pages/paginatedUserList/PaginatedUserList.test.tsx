import { fireEvent, render, screen } from '@testing-library/preact';
import { vi } from 'vitest';
import { searchUsers } from '../../github';
import PaginatedUserList from './PaginatedUserList';
import { User } from '../../models';

vi.mock('../../github', () => ({
    searchUsers: vi.fn(() => ({
        users: [new User('Ada', 'whatisaninternet')],
        cursors: [],
        userCount: 0,
    })),
}));

describe('<PaginatedUserList />', () => {
    it('searches for given query', async () => {
        render(<PaginatedUserList />);
        const searchField = screen.getByRole('search');

        fireEvent.input(searchField, { target: { value: 'worlds greatest' } });
        await new Promise((r) => setTimeout(r, 300));

        expect(searchUsers.mock.calls[0][0]).toBe('worlds greatest');
        expect(screen.getByText('Ada')).not.toBeNull();
    });
});
