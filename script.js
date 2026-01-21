//location
loc.addEventListener("click",fetchloc)
function fetchloc(){
new Promise((resolve,reject)=>{
    if(!navigator.geolocation){
        reject(new Error("Unable to find your location!."))
       return;}
    navigator.geolocation.getCurrentPosition((position)=>{resolve(position);},(er)=>{reject(er);});
}).then((position)=>{
   let lon=position.coords.longitude;
   let lang=position.coords.latitude;
   getLocData(lon,lang);
}).catch((er)=>{
    console.log(er);
})}

// fetching location data
async function getLocData(lon,lang){
    let url=`https://nominatim.openstreetmap.org/reverse?lat=${lang}&lon=${lon}&format=json`;
    let floc=await fetch(url);
    let dt=await floc.json();
    const outerLoc = document.getElementById("outloc");

    outerLoc.outerHTML = `
  <div id="outerLoc" style="font-family: sans-serif; line-height: 1.6">
    <h3>📍 Location Details</h3>

    <p><strong>Full Address:</strong> ${dt.display_name}</p>

    <p><strong>Village:</strong> ${dt.address.village ?? "N/A"}</p>
    <p><strong>District:</strong> ${dt.address.county ?? "N/A"}</p>
    <p><strong>State:</strong> ${dt.address.state ?? "N/A"}</p>
    <p><strong>Postcode:</strong> ${dt.address.postcode ?? "N/A"}</p>
    <p><strong>Country:</strong> ${dt.address.country ?? "N/A"}</p>

    <p><strong>Type:</strong> ${dt.type ?? "N/A"}</p>
    <p><strong>Class:</strong> ${dt.class ?? "N/A"}</p>

    <p><strong>Latitude:</strong> ${dt.lat}</p>
    <p><strong>Longitude:</strong> ${dt.lon}</p>
  </div>
`;


}
// speed
let watchId = null;
let lastPosition = null;
let totalDistance = 0;
let maxSpeed = 0;
let startTime = null;
// start
speed1.addEventListener("click",calcspeed);//fxn watch id true use stop else play
function calcspeed(){
 
     if(!navigator.geolocation){
        return "Unable to find your location!.";
}
 lastPosition = null;
 totalDistance = 0;
 maxSpeed = 0;
 startTime = new Date();
navigator.geolocation.watchPosition(calcspe,calcer, {
   
 
      enableHighAccuracy: true,     
  maximumAge: 0,               
  timeout: Infinity,           
  requireAltitude: true,       
  requireHeading: true     
       
});
}

function calcspe(postion)
{
    const newTime= new Date()
    if(lastPosition){
        const timediff=(newTime-new Date(lastPosition.timestamp))/1000;//in sec
        const dist=calculateDistance(
           lastPosition.coords.latitude,
           lastPosition.coords.longitude,
           postion.coords.latitude,
           postion.coords.longitude
        )
        if (timediff>0)
        {
            const speedKmph=(dist*3600)/(timediff*1000);
            maxSpeed=Max(maxSpeed,speedKmph)
            totalDistance+=dist;
            updateDisplay(totalDistance,maxSpeed,speedKmph,watchId)//display value
        }
        lastPosition={
            coords:{
                latitude:postion.coords.latitude,
                longitude:postion.coords,longitude

            },
            timestamp:postion.timestamp
        }


    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth's radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function calcer(er){
    console.log(er);
}

function updateDisplay(td,ms,s,W){
    if(W){
        stopbtn();
    }
    ospeed.textContent=`${s} kmph`;
    poi.innerHTML+=
    `<p>Total Distance : ${td} KM</p>
     <p>Max Speed : ${ms} Km/h</p>`;


}


