import { Stack, StackProps } from "aws-cdk-lib"
import { Cors, LambdaIntegration, ResourceOptions, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Construct } from "constructs";

interface ApiStackProps extends StackProps {
    spacesLambdaIntegration: LambdaIntegration
}

export class ApiStack extends Stack {
    public readonly lambdaIntegration: LambdaIntegration;

    constructor(scope: Construct, id: string, props?: ApiStackProps) {
        super(scope, id, props);

        const api = new RestApi(this, "ErrorProneApi");

        const optionsWithCors: ResourceOptions = {
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
                allowMethods: Cors.ALL_METHODS
            }
        }
        const errorProneResource = api.root.addResource('monitor', optionsWithCors);
        errorProneResource.addMethod('GET', props.spacesLambdaIntegration);

    }
}