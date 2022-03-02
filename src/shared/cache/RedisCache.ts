import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

export class RedisCache {
    private client: RedisClient;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);

    }

    // salvar dados no cache
    public async save(key: string, value: any): Promise<void> {
        await this.client.set(key, JSON.stringify(value));
    }

    // recuperar os dados no cache
    public async recover<T>(key: string): Promise<T | null> {
        const data = await this.client.get(key);

        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data) as T;

        return parsedData;
    }

    // excluir o cache
    public async invalidate(key: string): Promise<void> {
        await this.client.del(key);
    }
}