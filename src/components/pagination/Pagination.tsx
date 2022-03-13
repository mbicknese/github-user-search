import NextButton from './NextButton';
import NumberButton from './NumberButton';
import PrevButton from './PrevButton';

import style from './pagination.module.css';

export type PaginationProps = {
    total: number;
    current: number;
    perPage: number;
    onPageChange: (newPage: number) => void;
};

/**
 * Full pagination navigation component.
 *
 * Component emits a page change on user input, controlling parent component needs to handle the change and feed the
 * current page back to this navigation component. Actual browsing and handling data has been decoupled to allow for
 * more freedom in composition.
 *
 * @todo: handle case with too many pages
 */
const Pagination = ({total, current, perPage, onPageChange}: PaginationProps) => {
    const pageCount = Math.ceil(total / perPage);

    return (
        <nav class={style.this}>
            <PrevButton disabled={current === 1} onClick={() => onPageChange(current - 1)}/>
            {Array.from(new Array(pageCount), (_, n) => n + 1).map((n) => (
                <NumberButton
                    onClick={() => onPageChange(n)}
                    number={n}
                    current={current}
                    key={n}
                />
            ))}
            <NextButton
                disabled={current === pageCount}
                onClick={() => onPageChange(current + 1)}
            />
        </nav>
    );
};

export default Pagination;
