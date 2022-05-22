async function getResponse() {
    const data = {
        prompt: document.getElementById('userInput').value,
        engine: document.getElementById('engine-select').value
    }
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data),
    };
    const response = await fetch('/api/answerQuestion', options)
    const apiResponse = await response.text()
    return apiResponse
}
    
async function generateCard() {
    var prompt = document.getElementById('userInput').value;
    var response = await getResponse()
    const card = {
        "prompt": prompt,
        "response": response
    }
    $('h3').show()
    cardDiv = document.createElement('div');
    $(cardDiv).addClass("card mb-3")
        .prependTo($('#cardsGoHere'));
    cardBody = document.createElement('div');
    $(cardBody).addClass('card-body').prependTo(cardDiv)
    cardTitle = document.createElement('p');
    $(cardTitle).addClass('card-title')
        .html(`Prompt: ${card.prompt}`)
        .appendTo(cardBody)
    cardText = document.createElement('p');
    $(cardText).addClass('card-text')
        .html(`Response: ${card.response}`)
        .appendTo(cardBody)
}