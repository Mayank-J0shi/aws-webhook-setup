import { App } from "aws-cdk-lib";
import { LambdaStack } from "./stacks/businessLogicStack";
import { ApiStack } from "./stacks/apiStack";
import { MonitorStack } from "./stacks/monitorStack";


const app = new App();
const lambdaStack: LambdaStack = new LambdaStack(app, "lambdaStack");
new ApiStack(app, 'ApiStack', {
    spacesLambdaIntegration: lambdaStack.lambdaIntegration,
});
new MonitorStack(app, 'MonitorStack');