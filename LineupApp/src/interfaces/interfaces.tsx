export interface Team {
    id: number, 
    name: string, 
    city: string,
    abbreviation: string,
    sportUrl: string,
    sport: string
}

export interface Sport {
    id: number,
    name: string,
    url: string
}