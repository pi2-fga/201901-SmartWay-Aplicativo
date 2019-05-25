export function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

export function getHeaders() {
  return {
    headers: {
      'content-type': 'application/json'
    }
  };
} 