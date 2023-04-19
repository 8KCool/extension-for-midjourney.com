const handleSubmit = () => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = formData.get("username");
  const apiKey = formData.get("apiKey");
  chrome.storage.sync.set(
    {
      apiKey: apiKey,
      username: username,
    },
    function (result) {
    }
  );
  const submit=document.getElementById('gpt-submit')
  submit.innerText='Saved'
};
document.querySelector("#gpt-form").addEventListener("submit", handleSubmit);
document.querySelector('#gpt-reset').addEventListener('click',()=>{
  let userElement =document.getElementById('username')
    let apikeyElement =document.getElementById('apiKey')
    userElement.value=''
    apikeyElement.value=''
})

window.onload = async() => {
    const { apiKey } = await chrome.storage.sync.get("apiKey");
    const { username } = await chrome.storage.sync.get("username");
    
    let userElement =document.getElementById('username')
    let apikeyElement =document.getElementById('apiKey')
    
    if(username){
        userElement.value=username
    }
    if(apiKey){
        apikeyElement.value=apiKey
    }

}