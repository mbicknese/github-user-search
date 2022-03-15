class CursorList {
    /** the actual first cursor (at index 1) should be undefined */
    private static magicOffset = 2;

    constructor(private cursors: Array<string>) {}

    get length() {
        return this.cursors.length;
    }

    /**
     * Picks useful cursors from a longer list of cursors retrieved with a search query
     */
    public static fromEdges(
        edges: Array<{ cursor: string; [x: string | number | symbol]: unknown }>,
        perPage: number
    ): CursorList {
        return new CursorList(
            edges
                .slice(perPage - 1)
                .reduce((acc: Array<string>, { cursor }: { cursor: string }, i: number) => {
                    if (i % perPage === 0) {
                        acc[i / perPage] = cursor;
                    }
                    return acc;
                }, [])
        );
    }

    /**
     * Creates a new list based on own and incoming cursors
     *
     * The order of the cursors will be own cursors first, incoming cursors after. Cursors that are both in own and
     * incoming will be dropped from the incoming order.
     */
    public merge(incoming: CursorList): CursorList {
        return new CursorList(
            [...this, ...incoming]
                .filter((cursor) => cursor != null)
                .reduce((acc: Array<string>, cursor: string) => {
                    if (acc.includes(cursor)) {
                        return acc;
                    }
                    return [...acc, cursor];
                }, [])
        );
    }

    [Symbol.iterator]() {
        let index = -1 - CursorList.magicOffset;

        return {
            next: () => ({ value: this.cursors[++index], done: index >= this.length }),
        };
    }

    public at(index: number): string | undefined {
        if (index < CursorList.magicOffset && index > -1) {
            return;
        }
        return this.cursors[index - CursorList.magicOffset];
    }
}

export default CursorList;
