"use strict";

/**
 * Serverless Plugin to add a `RecursiveLoop` property to AWS Lambda functions.
 * 
 * The `RecursiveLoop` property allows configuration of recursive loop detection
 * for Lambda functions. When set to "Allow", no action is taken if a loop is detected.
 * When set to "Terminate", the function invocation is stopped and a notification is sent.
 * 
 * @example
 * // serverless.yml configuration
 * functions:
 *   myFunction:
 *     handler: handler.myFunction
 *     recursiveLoop: Terminate
 */

class ServerlessRecursiveLoopPlugin {
  constructor(serverless) {
    this.serverless = serverless;
    this.provider = this.serverless.getProvider("aws");
    this.hooks = {
      "package:compileFunctions": this.addRecursiveLoopProperty.bind(this),
    };
    if (
      this.serverless.configSchemaHandler &&
      this.serverless.configSchemaHandler.defineFunctionProperties
    ) {
      this.serverless.configSchemaHandler.defineFunctionProperties("aws", {
        properties: {
          recursiveLoop: {
            type: "string",
            enum: ["Allow", "Terminate"],
          },
        },
      });
    }
  }

  /**
   * Adds the `RecursiveLoop` property to the Lambda function's CloudFormation template.
   *
   * This method iterates through all functions defined in the Serverless service.
   * If a function has a `recursiveLoop` property, it validates the value and adds
   * it to the CloudFormation template.
   */
  addRecursiveLoopProperty() {
    const service = this.serverless.service;
    for (const functionName in service.functions) {
      const func = service.functions[functionName];
      if (func.recursiveLoop) {
        const recursiveLoop = func.recursiveLoop;
        if (["Allow", "Terminate"].includes(recursiveLoop)) {
          const functionResource =
            service.provider.compiledCloudFormationTemplate.Resources[
              this.provider.naming.getLambdaLogicalId(functionName)
            ];
          functionResource.Properties.RecursiveLoop = recursiveLoop;
        }
      }
    }
  }
}

module.exports = ServerlessRecursiveLoopPlugin;
