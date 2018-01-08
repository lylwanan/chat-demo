import { UserInfo, Record } from "../types/model";

class Store {
  current: number = -1
  records: Record = {}
  contacts: UserInfo[] = []
}

const store = new Store()

export default store