export default {
  setFoodData(state, data) {
    state.foodList = data;
  },
  setMarketData(state, data) {
    state.marketData = data;
  },
  setJobData(state, data) {
    state.JobData = data;
  },
  setRentlist(state, data) {
    state.rentData = data;
  },
  setTxt(state, data) {
    state.text = data;
  },
  resetTxt(state) {
    state.text = "";
  },
  setMallData(state, data) {
    state.mallData = data;
  },
  setCartData(state, data) {
    state.cartData.push(data)
  },
  setOrderData(state, data) {
    state.orderData = data;
  },
  addAddressData(state, data) {
    state.addressData.push(data);
  },
  setRelease(state, data) {
    state.releaseData = data;
  },
  setShowSign(state, data) {
    if (data) {
      state.showSign = true;
    } else {
      state.showSign = false;
    }
  },
  getPayPwd(state, data) {
    state.payPwd = data;
  },
  setArea(state, data) {
    state.areaList = data;
    state.areaList.unshift({
      id: "",
      name: "全部"
    });
  },
  hasCollect(state, data) {
    if (data.is_collect == 1) {
      state.collect = true;
    } else {
      state.collect = false;
    }
  },
  getKeyList(state, data) {
    state.searchList = data;
  },
  clearKeyList(state) {
    state.searchList = {
      key: 0,
      list: [],
      count: 0,
    }
  }
}
