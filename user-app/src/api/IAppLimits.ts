export interface IAppLimits {
  appId: string
  plan: string
  limits: Array<{ modelName: string; maxRecordsNr: number }>
}
