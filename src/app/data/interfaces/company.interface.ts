export interface Company {
  record: {
    name: string;
    address: any;
    boss: string;
    kved: any;
    status: string;
    shortname?: string;
    edrpou?: number;
    founders?: string[];
  };
}