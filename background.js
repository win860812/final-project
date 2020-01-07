(function () {
    'use strice';


    chrome.identity.getProfileUserInfo(function (userInfo) {
        console.log(userInfo.id);
        console.log(userInfo.email);
        user_email = userInfo.email;
        user_id = userInfo.id;
    });

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request == "getUserInfo") {
            console.log("getUserInfo");       
            sendResponse({
                email: user_email,
                id: user_id
            });
        }else if(request == "reload"){
            console.log("request");
            chrome.runtime.reload()
        }
    }); 

})();