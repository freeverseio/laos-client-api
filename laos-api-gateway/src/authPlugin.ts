import { MeshPlugin, YamlConfig } from '@graphql-mesh/types';
import validateApiKey from './validateApiKey';

const authPlugin: MeshPlugin<YamlConfig.Plugin['config']> = {
  async onExecute({ args }) {
    const { contextValue, document } = args;
    console.log('onExecute started!', contextValue.body);
    const apiKey = contextValue.headers['x-api-key'];
    const operation = document.definitions.find(
      (def: any) => def.kind === 'OperationDefinition'
    );

    
    if (operation.operation === 'mutation') {
      const mutationName = operation.selectionSet.selections[0].name.value;
      let contractAddress = '';
      if (mutationName === 'mint') {
        const mintArguments = operation.selectionSet.selections[0].arguments;
        const inputArg = mintArguments.find(
          (arg: any) => arg.name.value === 'input'
        );
        if (inputArg) {
          const contractAddressField = inputArg.value.fields.find(
            (field: any) => field.name.value === 'contractAddress'
          );
          if (contractAddressField) {
            contractAddress = contractAddressField.value.value;
          }
        }
      }
      if (!apiKey || !(await validateApiKey(apiKey, contractAddress))) {
        throw new Error('Invalid API key');
      }
    }
  },
 
};

export default authPlugin;