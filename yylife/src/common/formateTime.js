const formate = (time)=>{
	//处理  现在时间 - time
	let now = new Date().getTime();
	let miuns = now -time;
	//条件判断  
	/*
	 天
	 3600000*24  86400000
	 3600000
	 60000
	 1000
	 * */
	const dates={
		month:2592000000,
		day:86400000,
		hour:3600000,
		min:60000,
		sec:1000
	}
	let str="";
	if(miuns > dates.month){
		str=new Date(time).toLocaleString();
	}else if( miuns > dates.day){
		str=Math.floor(miuns/dates.day)+"天前";
	}else if(miuns > dates.hour){
		str=Math.floor(miuns/dates.hour)+"小时前";
	}else if(miuns > dates.min){
		str=Math.floor(miuns/dates.min)+"分钟前";
	}else{
		str="刚刚";
	}
	return str;
}

module.exports = formate;