## Getting started

### Installation

`npm install --save-dev @distinction-dev/serverless-lambda-recursiveloop`

# Serverless RecursiveLoop Plugin

A Serverless Framework plugin that adds a `RecursiveLoop` property to AWS Lambda function configurations. This property controls the recursive loop detection behavior for Lambda functions.

## Functionality

The `RecursiveLoop` property allows you to configure how AWS Lambda handles recursive loop detections for your functions. 

- **Allowed Values**:
  - `Allow`: No action is taken if a recursive loop is detected.
  - `Terminate`: The function invocation is stopped, and a notification is sent when a recursive loop is detected.

- **Type**: String
- **Required**: No
- **Resource Type**: `AWS::Lambda::Function`

## Installation

To use this plugin in your Serverless project, follow these steps:

1. **Create the Plugin File**:
   Create a file named `serverless-recursive-loop-plugin.js` in the root directory of your Serverless project and paste the plugin code into it.

2. **Add the Plugin to Your Serverless Configuration**:
   In your `serverless.yml` file, add the plugin under the `plugins` section.

   ```yaml
   service: my-service

   provider:
     name: aws
     runtime: nodejs14.x

   plugins:
     - "@distinction-dev/serverless-lambda-recursiveloop"

   functions:
     myFunction:
       handler: handler.myFunction
       recursiveLoop: Terminate

     anotherFunction:
       handler: handler.anotherFunction
       recursiveLoop: Allow
