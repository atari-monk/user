export interface IAppLimits extends Document {
  appId: string
  plan: string
  limits: Array<{ modelName: string; maxRecordsNr: number }>
}
