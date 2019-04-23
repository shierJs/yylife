import indexApi from "@/api/index"
import getInfoApi from "@/api/getInfo"
const actions = {
  getAreaList({
    commit
  }) {
    getInfoApi.getAllArea().then(res => {
      if (res.data.code === 200) {
        commit('setArea', res.data.data);
      } else {
        ;
      }

    }).catch(err => console.log(err));
  },
  getCollect({
    commit
  }, params) {
    getInfoApi.hasCollect(params).then(res => {
      if (res.data.code === 200) {
        commit('hasCollect', res.data);
      } else if (res.data.code === 10003) {
        let data = {
          is_collect: 1
        }
        commit('hasCollect', data);
        this.defined.removeToken();
      } else {
        console.log(res.data.msg);
      }
    }).catch(err => console.log(err));
  },
}
export default actions
