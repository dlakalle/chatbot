(function(){

  angular.module('appModule').service('botService', function (){

  const client = new ApiAi.ApiAiClient({accessToken: 'a92f37d0bd17421baef4097dbde7a70d'});
	// const client = new ApiAi.ApiAiClient({accessToken: 'a81a200f4eac41f889526f4692cddd98'});

	function handleResponse(serverResponse) {
		// console.log(serverResponse);
		return serverResponse.result.fulfillment.speech;
	}

	function handleError(serverError) {
	    // console.log(serverError);
	}

    function sendMessage(message){
    	return client.textRequest(message).then(handleResponse).catch(handleError);
    }

    function triggerEvent(eventName){
      return client.eventRequest(eventName, {}).then(handleResponse).catch(handleError);
    }

    return {
      sendMessage: sendMessage,
      triggerEvent: triggerEvent,
    };

  });

})();
