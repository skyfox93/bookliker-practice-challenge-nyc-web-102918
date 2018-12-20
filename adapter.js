function Adapter(baseURL){
  function get(route){
    return fetch(baseURL+route).then((resp)=> resp.json())
  }
  function post(route, data){
    return fetch(baseURL+route,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
      }
    ).then((resp)=> resp.json())
  }
  function patch(route, data){
    return fetch(baseURL+route,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify(data)
      }
    ).then((resp)=> resp.json())
  }
  return {get: get, post:post, patch: patch}
}
