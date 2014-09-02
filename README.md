# Angular Storage

* Session Storage
* Local Storage

Angular Storage Module - provides `$sessionStorage` and `$localStorage` factories. 

Each `$sessionStorage` and `$localStorage` implements save interface. Content of storage is serialized via JSON.stringify when content saving item and parsed via JSON.parse when item is pulled from storage.

Include Module: `tseed.storage`

Methods:

* `.put('index', 'value')` - saves item to storage.
* `.get('index')` - gets item from storage.
* `.has('index')` - checks if item exists in storage.

Example:

```
function StorageController($localStorage) {
	var count = $localStorage.has('count') 
		? $localStorage.get('count')
		: 0;
		
	console.log('Page Open Times: ' + count);
	$localStorage.put('count', count++);
}
```


