export interface IAppLimits extends Document {
  appId: string
  limits: Array<{ modelName: string; maxRecordsNr: number }>
}
