import NextButton from './NextButton';
import NumberButton from './NumberButton';
import PrevButton from './PrevButton';

import style from './pagination.module.css';

export type PaginationProps = {
    total: number;
    current: number;
    perPage: number;
    onPageChange: (newPage: number) => void;
    pageJump?: number;
};

/**
 * Full pagination navigation component.
 *
 * Component emits a page change on user input, controlling parent component needs to handle the change and feed the
 * current page back to this navigation component. Actual browsing and handling data has been decoupled to allow for
 * more freedom in composition.
 */
const Pagination = ({ total, current, perPage, onPageChange, pageJump = 2 }: PaginationProps) => {
    const pageCount = Math.ceil(total / perPage);

    const numberButtonsForJumping = (start: number, end: number) => {
        return Array.from(new Array(end - start), (_, n) => (
            <NumberButton
                onClick={() => onPageChange(n + start)}
                number={n + start}
                current={current}
            />
        ));
    };

    return (
        <nav class={style.this}>
            <PrevButton disabled={current === 1} onClick={() => onPageChange(current - 1)} />
            {current - pageJump > 1 ? <span>...</span> : null}
            {current > 1 ? numberButtonsForJumping(Math.max(current - pageJump, 1), current) : null}
            <NumberButton onClick={() => {}} number={current} current={current} />
            {current < pageCount
                ? numberButtonsForJumping(current + 1, Math.min(current + pageJump, pageCount) + 1)
                : null}
            {current + pageJump < pageCount ? <span>...</span> : null}
            <NextButton disabled={current >= pageCount} onClick={() => onPageChange(current + 1)} />
        </nav>
    );
};

export default Pagination;
