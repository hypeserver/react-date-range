


export enum Displaymode {
    DATE = 'date',
    DATE_RANGE = 'dateRange',

}

export interface Preview {
    startDate: Date
    endDate: Date
    color?: string
}


export interface Range {
    startDate: Date
    endDate: Date
    // FIXME
    isStartEdge?: boolean | null
    isEndEdge?: boolean | null
    isInRange?: boolean | null
    color?: string | null
}

