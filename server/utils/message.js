var generateMessage = (from,text)=>{
   return {
       from:from,
       text:text,
       createdAt:new Date()
   }
};

var generateLocationMessage = (from,lat,lng)=>{
  return {
      from:from,
      url:`https://www.google.com/maps?q=${lat},${lng}`
  }
}

module.exports = {generateMessage,generateLocationMessage}
