import { fireEvent, render, screen } from '@testing-library/preact';
import { vi } from 'vitest';

import DelayedInput from './DelayedInput';

describe('<DelayedInput />', () => {
    it('awaits delay before emitting', async () => {
        const spy = vi.fn();
        render(<DelayedInput onInput={spy} delay={5} />);

        fireEvent.input(screen.getByRole('textbox'), {
            target: { value: 'I typed something!' },
        });
        await new Promise((r) => setTimeout(r, 5));

        expect(spy).toHaveBeenCalledWith('I typed something!');
    });

    it('resets timer after new input', async () => {
        const spy = vi.fn();
        render(<DelayedInput onInput={spy} delay={5} />);

        const component = screen.getByRole('textbox');
        fireEvent.input(component, {
            target: { value: 'I typed something!' },
        });
        await new Promise((r) => setTimeout(r, 3));
        fireEvent.input(component, {
            target: { value: 'But changed it to something else' },
        });
        await new Promise((r) => setTimeout(r, 3));
        expect(spy).not.toHaveBeenCalled(); // 6ms after first input, emitting the event should be debounced

        await new Promise((r) => setTimeout(r, 3));

        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('But changed it to something else');
    });
});
