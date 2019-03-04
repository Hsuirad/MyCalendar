let r, g, b, r2, g2, b2;
let redreached, greenreached, bluereached;
[r, g, b] = [255, 172, 185];
[r2, g2, b2] = [80, 183, 255];
setInterval(function(){
	if(r < 80 && r2 > 255){
		redreached = true;
	} else if(r > 255 && r2 < 80) redreached = false;
	if(g > 183 && g2 < 172){
		greenreached = true;
	} else if(g < 172 && g2 > 183) greenreached = false;
	if(b > 253 && b2 < 185){
		bluereached = true;
	} else if(b < 185 && b2 > 255) bluereached = false;
	if(redreached){
		r += 1; r2 -= 1;
	} else if(!redreached){r -= 1; r2 += 1;}
	if(!greenreached){
		g += 1; g2 -= 1;
	} else if(greenreached){g -= 1; g2 += 1;}
	if(!bluereached){
		b += 1; b2 -= 1;
	} else if(bluereached){b -= 1; b2 += 1;}

	document.body.style.backgroundImage = document.getElementById('calendar').style.backgroundImage = `linear-gradient(to right, rgb(${r}, ${g}, ${b}), rgb(${r2}, ${g2}, ${b2})`;
}, 50);

const activitiestext = new Array(100);
let indice = 0;

let months = {
	january: 2,
	february: {
		startdate: 5,
		enddate: 32
	},
	march: 5,
	april: 1
}
let vent = "";
let days = 1;

let tdelements = new Array(35);

for(let z = 0; z < 35; z++){
	if(z >= months.february.startdate && z <= months.february.enddate){
		document.getElementsByTagName("TD")[z].innerText = days;	
		days++;
		tdelements[z] = document.getElementsByTagName('TD')[z];
	} else document.getElementsByTagName('TD')[z].innerText = "";
}

document.getElementById('close').addEventListener('click', function(){
	document.getElementById('prompt').style.display = "none";
	document.getElementById('input').value = "";
});

let clicked_add = false;

function thismightwork(){
	for(let z = 1; z < 99; z++){
		if(activitiestext[z].split(">>")[1] == activitiestext[z+1].split(">>")[1] && (activitiestext[z] != "")){
			let temp = activitiestext[z + 1];
			activitiestext[z + 1] = activitiestext[z]
			activitiestext[z] = temp;
		}
	}
}

function outputentries(check){
	let mutablearray = new Array(activitiestext.length);
	for(let x = 0; x < mutablearray.length; x++){
		mutablearray[x] = activitiestext[x];
	}
	let count = 0;

	for(let x = 0; x < mutablearray.length; x++){
		if(mutablearray[x]){	
			if(mutablearray[x].split(">>")[0] == check){
				console.log("adfADFSDF")
				count++;
			}
		}
		else{
			mutablearray.splice(x, 1)
		}
	}

	let returnarray = new Array(count);
	let dount = 0
	mutablearray.forEach(function(elem, index){
		if(mutablearray[index]){	
			if(mutablearray[index].split(">>")[0] == check){
				returnarray[dount] = mutablearray[index].split('>>')[1];
				dount++;
			}
		}
	})

	//formatting
	returnarray.forEach(function(elem, index){
		returnarray[index] = `<br />${index + 1}. ${returnarray[index]}`;
	});

	let string = returnarray.toString();
	string = string.replace(',', '\n');

	console.log(`${count}\n${mutablearray}\n${returnarray}`)

	return string;
}

document.getElementById('add').addEventListener('click', function(){
	console.log(event.target)
	if(document.getElementById('input').value != ""){	
		activitiestext[indice] = (tdelements[football].innerText) + ">>" + document.getElementById('input').value; //use .split('>> to split up the markers with the events')
		indice++;
		document.getElementById('input').value = "";
	}	
});

document.getElementById('check').addEventListener('click', function(){
	console.log(outputentries((football - months.february.startdate + 1), activitiestext));
	document.getElementById('prompt').style.display = 'none';
	let innertext = outputentries((football - months.february.startdate + 1), activitiestext);
	document.getElementById('eventview').innerHTML = `<strong>February ${football - months.february.startdate + 1}:</strong><br />${innertext}`;
	document.getElementById('eventview').scrollIntoView();
});

let football = 0;

function checktoseeifworks(){
	
	for(let z = 1; z < 100; z+=(z*2)){
		if(activitiestext[z] != ""){
			if(z == 1){	
				for(let a = 0; a < z; a++){
					activitiestext[z + a] = "";
				}
			}
			else{
				for(let a = 0; a < z-1; a++){
					activitiestext[z + a] = "";
				}
			}
		}
	}
}

for(let x = months.february.startdate; x <= months.february.enddate; x++){
	console.log(x);
	tdelements[x].addEventListener('click', function(){
		console.log(event.target + "\n" + x)
		football = x;
		document.getElementById('prompt').style.display = "block";
		document.getElementById('textlabel').innerText = `Enter your activities for February ${(x - months.february.startdate) + 1}`;		
	});
}
