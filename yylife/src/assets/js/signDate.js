 let signDate=lastTime=>{
    let date=new Date().toLocaleString();
    date=date.split(" ");
    date=date.split('/');
    lastTime=lastTime.split("-");
    date=compute(date);
    date2=compute(lastTime);
    if(date.year>date2.year){
        return 0;
    }else if(date.monthon>date.monthon){
        return 0;
    }else if (date.day>date.day){
        return 0;
    }else {
        return 1;
    }
 };

let compute=date=>{
    let dateArr=date;
    return {
        year=parseInt(dateArr[0]),
        monthon=parseInt(dateArr[1]),
        day=parseInt(dateArr[2]),
    }
}
export default signDate;