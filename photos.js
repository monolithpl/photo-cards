var newWord = document.getElementById("word-new")
var demo = document.getElementById("demo")
var list = document.getElementById("word-list")
var count = document.getElementById("word-count")
var wordArray = []
var phrasalVerbs = []

function updateCount(){
	document.getElementById('instructions').innerHTML = ''
	if (list.children.length > 1) count.innerHTML = list.children.length + ' words'
	else if (list.children.length == 0) count.innerHTML = 'hit enter to add word'
	else count.innerHTML = list.children.length + ' word'
}
list.addEventListener("click", function(event) {
    if (event.target !== event.currentTarget) {
        if (event.target.className == "destroy")
		{
			wordArray.splice(wordArray.indexOf(event.target.parentElement.getElementsByTagName("LABEL")[0].innerHTML), 1)
			event.target.parentElement.parentNode.removeChild(event.target.parentElement)
			updateCount()
			var wordCard = document.getElementById('card-svg-' + event.target.parentElement.getElementsByTagName("LABEL")[0].innerHTML)
			wordCard.parentNode.removeChild(wordCard)
		}
    }
    event.stopPropagation()
})

function getPicture(word) {
	var req = new XMLHttpRequest()
	var requestString = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="
	
	var flickrAPIkey = ['05bdd790fdcd89f9344003e0f47d7c86',
						'05cb76b43d4a1353bbaf218d23303863',
						'10f37feff9a19338e1dcbe6499cf45bc',
						'114e76e838f8bcf0bded4e42a7baf1cc',
						'1c9f777eb7446f34a7261dc1a54be4b2',
						'276580779b3354f9d6820e102e5775f0',
						'280b38c29c246b4d134fab6579955289',
						'2a2ce06c15780ebeb0b706650fc890b2',
						'3624106015a6a4fa65d62b48dd872655',
						'37ad78fdb433e497de195f7c452ad8af',
						'3abfc0179898d3ad907be5001f4b3933',
						'671aab1520e2cb69e08dd36a5f40213b',
						'6b11576331fc0406bbb316a06ae26061',
						'722ca392ec53e930396f24afd29a10d6',
						'736d19d58703d5da37a1c87aeed71f96',
						'7a55b9d8e3e3aca6b8eae1e310404f60',
						'7d09cc024d8da1bdd970c79ba7291eca',
						'7fbc4d0fd04492d32fa9a2f718c6293e',
						'8fc84b34b0e81dff89164ac8570800a1',
						'90485e931f687a9b9c2a66bf58a3861a',
						'919a77af51a155866700ea285de18eef',
						'91bace887faabf57a704cea71a25eaf2',
						'9dbd11a573a92b7962c238c8d7611492',
						'a09ef8d2480f136858052df0d219376b',
						'be5a0153269cbad270e987d8743eaa87',
						'c871b759c44a9c7d3ced100ba2cf4dd0',
						'd80f3d9a8e56b8bc7ec5eaa7d4389e23',
						'de588f636351940ff7e359de88f122d0',
						'edd9657c0af38e133a0416cc1815dac7',
						'f09b3c70b55c8ab9982d3c89fbcae7d8',
						'f4659b5c5da25194ae1635a028ef991f',
						'f5762a90a3a7e08e4aab2ff5b8904107',
						'f631266c2d597ca2ee84ef8b7712a70e',
						'fb90366ca9b7f830a002e1ff0924da2a',
						'fe7ecb07818d196fd975fd8819b46a49']
	flickrAPIkey = flickrAPIkey[Math.floor(Math.random() * flickrAPIkey.length)]
	
    requestString += flickrAPIkey
	requestString += "&text="
    requestString += encodeURIComponent(word)
    requestString += "&sort=relevance&media=photos&content_type=1&format=json&nojsoncallback=1&page=1&per_page=1"
	
	req.open('GET', requestString, true)
	req.onload = function () {
		if (req.status >= 200 && req.status < 400) {
			json = JSON.parse(req.responseText)
			var url = "https://farm" + json.photos.photo[0].farm + ".staticflickr.com/" + json.photos.photo[0].server + "/" + json.photos.photo[0].id + "_" + json.photos.photo[0].secret + ".jpg"
	
			var entry = document.createElement('div')
			entry.className = "card"
			entry.id = 'card-' + word
			entry.innerHTML = '<img src="' + url + '" width="330px">'
			document.getElementById('photos').insertBefore(entry, document.getElementById('photos').childNodes[0])

		}
	req.onerror = function() {
		console.log('Sorry, there was an error getting photos from Flickr.')
	}
	}
	req.send()
}
function addWord(word){
	for (var i = 0; i < arguments.length; ++i) {
		var word = arguments[i]
		
		var entry = document.createElement('li')
		entry.innerHTML = '<label>' + word + '</label><button class="destroy"></button>'
		list.insertBefore(entry, list.childNodes[0])
		wordArray.push(word)
		
		getPicture(word)
		
		updateCount()
	}
}

		
		
demo.addEventListener("click", function(event) {
	addWord('stranger')
})

newWord.addEventListener("keypress", function(event) {
    if (event.keyCode == 13 && newWord.value.trim() !== '')
	{
		addWord(newWord.value)
		newWord.value = ''	
	}
})