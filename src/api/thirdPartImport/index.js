import { post } from "@/utils/request"
export const thirdPartImportByMarkProject=(data)=>
  post({
    url:"/thirdPartImport/thirdPartImportByMarkProject",
    data
  })