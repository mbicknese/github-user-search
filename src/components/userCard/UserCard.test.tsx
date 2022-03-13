import { render, screen } from '@testing-library/preact';

import UserCard from './UserCard';
import { User } from '../../models';

describe('<UserCard />', () => {
    it('renders sane defaults and hides empty fields', () => {
        const dummy = new User('dummy mcdummyface', 'dmcd');
        render(<UserCard user={dummy} />);

        expect(screen.queryByRole('blockquote')).not.toBeInTheDocument();
        expect(screen.getAllByLabelText('user detail')).toHaveLength(2);
        expect(screen.queryAllByText('0 stars')).not.toBeNull();
        expect(screen.queryAllByText('0 repos')).not.toBeNull();
    });

    it('can show user bio and quote', () => {
        const dummy = new User('dummy mcdummyface', 'dmcd', 'some bio', '', 1, 1, 'some quote');
        render(<UserCard user={dummy} />);

        expect(screen.getAllByLabelText('user detail')).toHaveLength(4);
        expect(screen.getByText('some bio')).toBeInTheDocument();
        expect(screen.getByText('some quote')).toBeInTheDocument();
    });
});
