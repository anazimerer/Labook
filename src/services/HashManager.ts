import * as bcrypt from 'bcryptjs'

export default class HashManager{
    public async hash(text:string): Promise<string>{
        const salt = await bcrypt.genSalt(12)
        const result = await bcrypt.hash(text, salt)
        return result
    }

    public async compare(text:string, hash: string): Promise<boolean>{
        return bcrypt.compare(text,hash)
    }
}