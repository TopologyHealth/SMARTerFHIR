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
export declare const cerner: LaunchConfig;
export {};
