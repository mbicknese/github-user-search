import CursorList from './CursorList';

describe('CursorList', () => {
    it('returns undefined at the 1 index', () => {
        const list = new CursorList(['a']);
        expect(list.at(1)).toBeUndefined();
    });

    it('returns the cursor at given position', () => {
        const list = new CursorList(['a']);
        expect(list.at(2)).toBe('a');
    });

    it('drops overlapping cursors while merging', () => {
        const result = new CursorList(['a', 'b']).merge(new CursorList(['b', 'c']));
        expect([...result]).toEqual([undefined, undefined, 'a', 'b', 'c']);
    });

    it('picks nth cursors from search edges', () => {
        const result = CursorList.fromEdges(
            [
                { cursor: 'a' },
                { cursor: 'b' },
                { cursor: 'c' },
                { cursor: 'd' },
                { cursor: 'e' },
                { cursor: 'f' },
            ],
            2
        );

        expect([...result]).toEqual([undefined, undefined, 'b', 'd', 'f']);
    });
    it('returns empty on empty edges', () => {
        const result = CursorList.fromEdges([], 2);

        expect([...result]).toEqual([undefined, undefined]);
    });
});
