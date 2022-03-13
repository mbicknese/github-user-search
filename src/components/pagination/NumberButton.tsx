import style from './button.module.css';
import classNames from 'classnames';
import { JSXInternal } from 'preact/src/jsx';

export type NumberButtonProps = {
    onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
    number: number;
    current: number;
};

const NumberButton = ({ onClick, number, current }: NumberButtonProps) => (
    <button
        class={classNames(style.this, { [style.active]: number === current })}
        type="button"
        onClick={onClick}
        aria-label={`Go to page ${number}`}
    >
        {number}
    </button>
);

export default NumberButton;
