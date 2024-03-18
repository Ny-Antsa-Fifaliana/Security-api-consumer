export class AppRole{
    id!: number;
    roleName: string;

    constructor(roleName:string){
        this.roleName=roleName;
    }

    public getId(): number{
        return this.id;
    }

    public setId(id: number): void{
        this.id=id;
    }
}