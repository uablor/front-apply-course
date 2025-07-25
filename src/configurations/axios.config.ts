import type { AxiosInstance } from "axios"
import axios from "axios"
import { singleton } from "tsyringe"

@singleton()
export class AxiosApi {
  public axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: import.meta.env.VITE_APP_BASE_API_URL,
    })

    this.axios.interceptors.request.use(
      async (config: any) => {
        const session = sessionStorage.getItem("user")
        const accessToken = localStorage.getItem("token")
        const user = session ? JSON.parse(session) : null


        if (user && Date.now() >= user.exp_in) {
          // TODO: เรียก refresh token จาก AuthenticationService
          // const service = container.resolve(AuthenticationService)
          // await service.refreshToken()
        }

        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`
        }

        return config
      },
      (error: any) => Promise.reject(error)
    )
  }
}
