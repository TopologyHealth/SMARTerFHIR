/**
Represents the LaunchConfig interface for launch configuration.
@interface
*/
interface LaunchConfig {
  scopes: string[];
}

/**
 * Launch configuration for Cerner.
 * @constant {LaunchConfig}
 */
export const cerner: LaunchConfig = {
  scopes: [
    "pr_allergyintolerance",
    "pr_careplan",
    "pr_communication",
    "pr_condition",
    "pr_consent",
    "pr_device",
    "pr_encounter",
    "pr_goal",
    "pr_medicationrequest",
    "pr_observation",
    "pr_patient",
    "pr_questionnaire",
    "pr_questionnaireresponse",
    "pr_servicerequest",
    "pr_documentreference",
    "pw_allergyintolerance",
    "pw_communication",
    "pw_medicationrequest",
    "pw_observation",
    "pw_questionnaireresponse",
    "pw_documentreference",
    "ur_allergyintolerance",
    "ur_careplan",
    "ur_communication",
    "ur_condition",
    "ur_consent",
    "ur_device",
    "ur_documentreference",
    "ur_encounter",
    "ur_immunization",
    "ur_medicationrequest",
    "ur_observation",
    "ur_organization",
    "ur_patient",
    "ur_procedure",
    "ur_provenance",
    "ur_questionnaire",
    "ur_questionnaireresponse",
    "ur_servicerequest",
    "uw_allergyintolerance",
    "uw_communication",
    "uw_questionnaireresponse",
    "uw_documentreference",
  ],
};
