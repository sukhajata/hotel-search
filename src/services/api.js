
export async function getHotels() {
    const result = await get("https://sukhajata.com/h/hotel/select.php");
    return result;
}

export async function getHotel(id) {
    const result = await get("https://sukhajata.com/h/hotel/select.php?id=" + id.toString());
    return result;
}

export async function getTambons() {
    const result = await get("https://sukhajata.com/h/hotel/tambons.php");
    return result;
}

export async function getRoomTypes() {
    const result = await get("https://sukhajata.com/h/room/select.php");
    return result;
}

export async function getHotelRooms(id) {
    const result = await get("https://sukhajata.com/h/hotel/rooms.php?id=" + id.toString());
    return result;
}

export async function getHotelPhotos(id) {
    const result = await get("https://sukhajata.com/h/hotel/photos.php?id=" + id.toString());
    return result;
}

export async function search(arrive, depart) {
    const result = await get("https://sukhajata.com/h/hotel/search.php?arrive=" + arrive + "&depart=" + depart);
    return result;
}

export async function getRoom(id) {
    const result = await get("https://sukhajata.com/h/hotel/room.php?id=" + id.toString());
    return result;
}

async function get(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/*
address_english: "229 Mu 6"
address_thai: "229หมู่6"
lat: 16.003166
lng:105.224379
name_english: "Namsap Villa Resort"
name_thai: "น้ำแซบ วิลล่า รีสอร์ท"
phone: "081 835 4755"
tambon_id: 1
*/
export async function addHotel(data) {
   const result = await post("https://sukhajata.com/h/hotel/create.php", data);
   return result;
}

export async function addRoomType(data) {
    const result = await post("https://sukhajata.com/h/room/create.php", data);
    return result;
}

export async function addHotelPhoto(data) {
    const result = await post("https://sukhajata.com/h/hotel/add-photo.php", data);
    return result;
}

export async function addRoomPhoto(data) {
    const result = await post("https://sukhajata.com/h/hotel/add-room-photo.php", data);
    return result;
}

export async function updateHotel(data) {
    const result = await post("https://sukhajata.com/h/hotel/update.php", data);   
    return result;
}

export async function updateRoom(data) {
    const result = await post("https://sukhajata.com/h/room/update.php", data);
    return result;
}


async function post(url, data) {
    try {
        const searchParams = Object.keys(data).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
          }).join('&');

        
         const response = await fetch(url, {
             method: 'POST',
             mode: 'cors',
             headers: {
                 'Accept': 'application/json',
                 //'Content-Type': 'application/json',
                 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                 //"Content-Type": "application/x-www-form-urlencoded",
             },
             //body: JSON.stringify(data), 
             body: searchParams
         });
         if (!response.ok) {
             throw Error(response.statusText);
         }
         const json = response.json();
         return json;
     } catch (error) {
         console.log(error);
         return null;
     }
}