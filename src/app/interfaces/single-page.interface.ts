export interface SinglePage {
    record: {
        id?: string,
        name: string,
        fio?: string,
        regdate?: string,
        edrpou?: string,
        state?: string,
        address?: string,
        phone?: string,
        status: string,
        creators?: string,
        governments?: string[],
        license?: string,
        boss?: string;
        kved?: any,
        shortname?: string,
        founders?: string[];
        n_founders?: string[];
    }
}
