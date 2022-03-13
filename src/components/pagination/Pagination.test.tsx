import { render, screen } from '@testing-library/preact';
import style from './button.module.css';

import Pagination from './Pagination';

const noop = () => {};

describe('<Pagination />', () => {
    it('renders enough pages to show all results', () => {
        render(<Pagination total={19} current={2} perPage={5} onPageChange={noop} />);
        expect(screen.getAllByRole('button')).toHaveLength(6); // 4 numbers plus next and previous
    });

    it('highlights the right page', () => {
        render(<Pagination total={15} current={2} perPage={5} onPageChange={noop} />);

        expect(screen.getAllByRole('button').at(1)).not.toHaveClass(style.active);
        expect(screen.getAllByRole('button').at(2)).toHaveClass(style.active);
        expect(screen.getAllByRole('button').at(3)).not.toHaveClass(style.active);
    });

    it('emits on number press', () => {
        const spy = vi.fn();
        render(<Pagination total={15} current={2} perPage={5} onPageChange={spy} />);

        screen.getAllByRole('button').at(1)?.click();

        expect(spy).toHaveBeenCalledWith(1);
    });

    it('emits on back press', () => {
        const spy = vi.fn();
        render(<Pagination total={15} current={3} perPage={5} onPageChange={spy} />);

        screen.getByText('Previous')?.click();

        expect(spy).toHaveBeenCalledWith(2);
    });
    it('does not emit on back press when on first page', () => {
        const spy = vi.fn();
        render(<Pagination total={15} current={1} perPage={5} onPageChange={spy} />);

        screen.getByText('Previous')?.click();

        expect(spy).not.toHaveBeenCalled();
    });

    it('emits on next press', () => {
        const spy = vi.fn();
        render(<Pagination total={15} current={1} perPage={5} onPageChange={spy} />);

        screen.getByText('Next')?.click();

        expect(spy).toHaveBeenCalledWith(2);
    });
    it('does not emit on next press when on last page', () => {
        const spy = vi.fn();
        render(<Pagination total={15} current={3} perPage={5} onPageChange={spy} />);

        screen.getByText('Next')?.click();

        expect(spy).not.toHaveBeenCalled();
    });
});
