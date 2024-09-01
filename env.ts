import zod from 'zod'

const publicEnv = {}

const env = {
    ...publicEnv,
    AUTH_SECRET: zod.string(),
    DATABASE_URL: zod.string(),
}

export const envSchemaPublic = zod.object(publicEnv)

export const envSchema = zod.object(env)

export const validateEnvSafe = (object: any) => {
    return envSchema.safeParse(object)
}

export const envIsValid = (object: any) => {
    return validateEnvSafe(object).success
}

export const validateEnv = (object: any) => {
    return envSchema.parse(object)
}

export const validatePublicEnvSafe = (object: any) => {
    return envSchemaPublic.safeParse(object)
}

export const publicEnvIsValid = (object: any) => {
    return validatePublicEnvSafe(object).success
}

export const validatePublicEnv = (object: any) => {
    return envSchemaPublic.parse(object)
}
