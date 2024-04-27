import { Stack, StackProps } from "aws-cdk-lib"
import { LambdaIntegration } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { join } from "path";

export class LambdaStack extends Stack {
    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const businessLambda = new NodejsFunction(this, "BusinessFncLambda", {
            runtime: Runtime.NODEJS_18_X,
            handler:  'handler',
            entry: (join(__dirname, '..', '..', 'services', 'handler.ts'))
        });
        this.lambdaIntegration = new LambdaIntegration(businessLambda);
    }
}