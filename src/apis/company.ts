import { baseApi } from ".";

export const companyApi = {
  list: (token: string) =>
    baseApi.get(`/company`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getInfo: (Data: any) => baseApi.post(`/company/info`, Data),
  getAvg: (Data: any) => baseApi.post(`/average/info`, Data),
  getCustomList: (Data: any) => baseApi.post(`/company/customlist`, Data),
  getSearchList: (Data: any) => baseApi.post(`/company/searchList`, Data),
  getCompanyAnalysis: (Data: any) =>
    baseApi.post(`/company/companyAnalysis`, Data),
  getCompanyList: (Data: any) => baseApi.post(`/company/getListCompany`, Data),
};
