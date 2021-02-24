function toNDecs(n, m){
	n = Math.round(n*(m*10))/(m*10)
	var a = n.toString().split('.');
if ( a.length === 2 ){
		return Number(a[0]+'.'+a[1].substring(0,3));
	} else {
		return Number(n);
	}
}
function printf(s,a){
	var newS=s,i;
	for(i=0;i<a.length;i++){
		newS = newS.replace('%s',a[i]);
	}
	return newS;
}
function getWireData(){
	var c,i,p,s='',data = {
		"red": 0, "green": 0, "blue": 0, "yellow": 0,
		"dangle": 0,"total": 0
	}
	for(i=0;i<cwires;i++){
		c = colors[nums[i]%colors.length];
		data[c]++;
		if (nums[i]<85){
			data.dangle++;
		}
		//nums[i]<85 ? data.dangle++ : null;
		data.total++;
	}
	for(p in data){
		s += printf(
			"%s:%s ", [
				p.substring(0,1),
				data[p]
			]
		);
	}
	return s;
}
function getRarity(){
	var colors = ["red","green","blue","yellow"];
	var nums=getNums(),cblobs,brow,myp,mw,smile,fcolor;
	var ed,browAng,pupOffs,stache,blush,blinkRate;
	var SZ = Math.min(window.innerWidth,window.innerHeight);

	cblobs = nums[0]%7+6;
	let cwires = nums[0]%28+4;
	let wiredata = getWireData();
	brow = nums[2] <= 128;
	myp = toNDecs( to1(nums[3]), 3 );
	mw = toNDecs( to1(nums[4])*(SZ/6.7), 3 );
	smile = toNDecs( to1N(nums[5])*(SZ/20)*-1, 3 );
	fcolor = colors[nums[6]%colors.length];
	ed = toNDecs( to1(nums[7])*(SZ/13.33), 3 );
	browAng = toNDecs( to1N(nums[8])*45, 3 );
	pupOffs = [
		toNDecs( to1N(nums[9]), 3 ),
		toNDecs( to1N(nums[10]), 3 )
	];
	stache = nums[12]<39;
	blush = nums[15]<39;
	blinkRate = toNDecs( (to1(nums[18])*10000+5000)/1000, 3 );

	features.push( "Cloud Blobs: " + cblobs );
	features.push( printf( "%s Wires (%s)",[cwires,wiredata]) );
	//features.push( "Mouth Y Position: " + myp);
	features.push( "Mouth Width: " + mw );
	features.push( "Face Color: " + fcolor );
	features.push( "Smile Amount: " + smile );
	features.push( "Blink Rate: " + blinkRate + " seconds" );
	if (blush) features.push( "Blush Variant" );
	//features.push( "Eye Distance: " + ed );
	//features.push( "Eye Direction: " + pupOffs );
	if (brow){
		features.push( "Eyebrow Angle: " + browAng );
	} else {
		features.push( "No Eyebrows Variant" );
	}
	if (stache) features.push( "Mustache Variant" );

	console.log( features.join('\n') );
}
