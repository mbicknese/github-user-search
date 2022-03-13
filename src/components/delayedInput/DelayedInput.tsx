import {createRef} from 'preact';
import {useEffect} from 'preact/compat';

// Shameless attempt to score points by using RxJS
import {fromEvent} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

/**
 * Magic number I've come up with.
 *
 * It seems to be the perfect balance between my typing speed and getting a quick response. This prevents emitting
 * intermediate events whilst still feeling snappy. Experience may vary from person to person.
 */
const defaultDelay = 300;

export type DelayedInputProps = {
    onInput: (value: string) => void;
    delay?: number;
};

/**
 * Like a normal text input, but it delays emitting input.
 */
const DelayedInput = ({ onInput, delay = defaultDelay }: DelayedInputProps) => {
    const ref = createRef();
    useEffect(() => {
        const input$ = fromEvent(ref.current, 'input');

        input$
            .pipe(
                map((event: any) => event.currentTarget.value),
                debounceTime(delay)
            )
            .subscribe(onInput);
    }, []);

    return <input type="text" ref={ref} />;
};

export default DelayedInput;
