const mutations={
    setShowLog(state,data){
        if(data){
            state.showLog=true;
        }else{
            state.showReg=true;
        }
    },
    fadeLogReg(state){
        state.showLog=false;
        state.showReg=false;
    },
    showFeed(state,data){
        if(data){
            state.feed=true;
        }else{
            state.feed=false;
        }
    },
    setArea(state,data){
        state.areaList=[];
        for(let i=0;i<data.length;i++){
            if(data[i].children){
                state.areaList=state.areaList.concat(data[i].children);
            }else{
                state.areaList.push(data[i]);
            }
        }
        state.areaList.unshift({
            id:"",
            name:"全部"
        })
    },
    hasCollect(state,data){
        if(data.is_collect == 1){
            state.collect=true;
          }else{
            state.collect=false;
          }
    },
    getKeyList(state,data){
        state.searchList=data;
    },
    clearKeyList(state){
        state.searchList={
            key:0,
            list:[],
            count:0,
        }
    },
};
export default mutations