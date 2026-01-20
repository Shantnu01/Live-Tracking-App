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
