import * as GraphQLJS from 'graphql'
import { useEngine } from '@envelop/core'
import type { Plugin } from '@envelop/core'
 
const myPlugin: Plugin = {
  onParse({ params }) {
    console.log('Parse started!', { params })
 
    return result => {
      console.log('Parse done!', { result })
    }
  },
  onExecute({ args }) {
    console.log('Execution started!', { args })
 
    return {
      onExecuteDone({ result }) {
        console.log('Execution done!', { result })
      }
    }
  }
}
export default myPlugin;