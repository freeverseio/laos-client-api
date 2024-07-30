import { execute, parse, specifiedRules, subscribe, validate } from 'graphql'
import { envelop, useEngine } from '@envelop/core'
import { ResolveUserFn, useGenericAuth, ValidateUserFn } from '@envelop/generic-auth'

type UserType = {
  id: string
}

const resolveUserFn: ResolveUserFn<UserType> = async (context: Record<string, any>) => {
  try {
    const apiKey = context.req?.headers?.authorization
    console.log('resolveUserFn: ' + context.req?.headers);
    return {
      id: "test"
    }
  } catch (e) {
    console.error('Failed to validate token')

    return null
  }
}
const validateUser: ValidateUserFn<UserType> = params => {
  /* ... */
  console.log("validateUser", params)
}

 
const plugins = envelop({
  plugins: [
  useGenericAuth({
      resolveUserFn,
      validateUser,
      mode: 'protect-all'
    })
  ]
})

export default plugins
