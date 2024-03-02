export interface IDestination {
  ToAddresses: Array<string>
}

export interface IBody {
  text_part: string
  html_part: string
}

export interface ILocalstackSesMessage {
  Id: string
  Body: IBody
  Destination: IDestination
  Region: string
  Source: string
  Subject: string
  Timestamp: Date
}

export interface ILocalstackSesResponse {
  messages: ILocalstackSesMessage[]
}

export interface IEmail extends ILocalstackSesMessage {
  Read: boolean
}
