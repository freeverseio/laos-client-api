import { MeshPlugin, YamlConfig } from '@graphql-mesh/types';
import { ResolveUserFn, ValidateUserFn } from '@envelop/generic-auth'
import { useGenericAuth } from '@envelop/generic-auth'



const authPlugin: MeshPlugin<YamlConfig.Plugin['config']> = {
  onExecute({ args }) {
    const { contextValue, document } = args;
    const apiKey = contextValue.headers['x-api-key'];
    const apiKey2 = contextValue.headers['Authorization'];
    console.log('Unauthorized****************' + apiKey);
    console.log('Unauthorized****************' + apiKey2);
    
  },
 
  onFetch(payload) {
    console.log('Fetch started!',  payload.options.body )

    return result => {
          // console.log('Fetch done!', { result })
    }
  },
  
};

export default authPlugin;