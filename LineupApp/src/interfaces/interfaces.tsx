export interface Team {
    id: number, 
    name: string, 
    location: string,
    abbreviation: string,
    sportUrl: string,
    sportName: string,
    logoUrl: string
}

export interface Sport {
    id: number,
    name: string,
    url: string
}

export interface CFBConference {
    id: number,
    name: string,
    divisionId: number
}

export interface CBBConference {
    id: number, 
    name: string
}

export interface CFBDivision {
    id: number,
    name: string
}