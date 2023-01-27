import Region from './Region';

interface Client {
    id: number,
    name: string,
    lastName: string,
    createAt: string,
    email: string,
    photo: string,
    region: Region
}


export default Client;
