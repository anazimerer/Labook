import { v4 } from "uuid";

export default class IdGenerator{
    public generateId(): string{
        return v4();
    }
}