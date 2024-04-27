import { Duration, Stack, StackProps } from "aws-cdk-lib"
import { Alarm, Metric, Unit } from "aws-cdk-lib/aws-cloudwatch";
import { SnsAction } from "aws-cdk-lib/aws-cloudwatch-actions";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Topic } from "aws-cdk-lib/aws-sns";
import { LambdaSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { Construct } from "constructs";
import { join } from "path";

export class MonitorStack extends Stack {

    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);
        const monitorLambda = new NodejsFunction(this, "MonitorLambda", {
            runtime: Runtime.NODEJS_18_X,
            handler:  'handler',
            entry: (join(__dirname, '..', '..', 'services', 'monitor', 'handler.ts'))
        });

        const alarmTopic = new Topic(this, 'AlarmTopic', {
            displayName: 'AlarmTopic',
            topicName: 'AlarmTopic'
        });
        alarmTopic.addSubscription(new LambdaSubscription(monitorLambda));

        const api4xxAlarm = new Alarm(this, 'api4xxAlarm', {
            metric: new Metric({
                metricName: '4XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "ErrorProneApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 5,
            alarmName: 'Api4xxAlarm'
        });
        const api5xxAlarm = new Alarm(this, 'api5xxAlarm', {
            metric: new Metric({
                metricName: '5XXError',
                namespace: 'AWS/ApiGateway',
                period: Duration.minutes(1),
                statistic: 'Sum',
                unit: Unit.COUNT,
                dimensionsMap: {
                    "ApiName": "ErrorProneApi"
                }
            }),
            evaluationPeriods: 1,
            threshold: 1,
            alarmName: 'Api5xxAlarm'
        });
        const topicAction = new SnsAction(alarmTopic);
        api4xxAlarm.addAlarmAction(topicAction);
        api4xxAlarm.addOkAction(topicAction);
        api5xxAlarm.addAlarmAction(topicAction);
        api5xxAlarm.addOkAction(topicAction);
    }
}