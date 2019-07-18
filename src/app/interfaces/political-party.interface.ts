export interface PoliticalParty {
    record: {
        id: string,
        name: string,
        regdate: string,
        edrpou: string,
        state: string,
        address: string,
        phone: string,
        status: string,
        creators: string,
        governments: string[],
        license: string 
    }
}