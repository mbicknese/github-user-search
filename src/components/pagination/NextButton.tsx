import style from './button.module.css';
import classNames from 'classnames';
import { JSXInternal } from 'preact/src/jsx';

export type NextButtonProps = {
    onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
};

const NextButton = ({ onClick, disabled }: NextButtonProps) => (
    <button
        class={classNames(style.this, style.next)}
        type="button"
        disabled={disabled}
        onClick={onClick}
    >
        Next
    </button>
);

export default NextButton;
