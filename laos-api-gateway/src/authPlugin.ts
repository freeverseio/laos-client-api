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

    operation.selectionSet.selections.forEach((selection: any) => {
      if (selection.arguments) {
        console.log('selection.arguments started!', selection.arguments);
        selection.arguments.forEach((arg: any) => {
          if (arg.name.value === 'where') {
            const contractAddressField = arg.value.fields.find(
              (field: any) =>
                field.name.value === 'contractAddress' &&
                field.value.value === '0x21e999b6f9be90448b8de0578ef708018df90009'
            );

            if (contractAddressField) {
              console.log('contractAddressField started!', contractAddressField);
            }
          }
        });
      }
    });
    if (operation.operation === 'mutation') {
      if (!apiKey || !(await validateApiKey(apiKey))) {
        throw new Error('Invalid API key');
      }
    }
  },
 
};

export default authPlugin;