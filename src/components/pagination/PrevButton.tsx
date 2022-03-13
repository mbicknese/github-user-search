import style from './button.module.css';
import classNames from 'classnames';
import { JSXInternal } from 'preact/src/jsx';

export type PrevButtonProps = {
    onClick: JSXInternal.MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
};

const PrevButton = ({ onClick, disabled }: PrevButtonProps) => (
    <button
        class={classNames(style.this, style.previous)}
        type="button"
        disabled={disabled}
        onClick={onClick}
    >
        Previous
    </button>
);

export default PrevButton;
