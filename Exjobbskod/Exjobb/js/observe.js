var observerPattern = {
	"observers" : [],

    "observe" : function(/* obj, action 1 ... action N, callback */) {
		var self = this;

		var obj = arguments[0];
		var actions = [].slice.call(arguments, 1, arguments.length-1);
		var callback = arguments[arguments.length-1];

		if(typeof(obj) === 'object' && 'observers' in obj) {
			for(var i in actions) {
				obj.observers.push({'action' : actions[i], 'callback' : callback, 'scope' : this});
			}
		}
		else {
			/*minimajs.debug("Warning: The following object is not observable:", obj);*/
		}

		return this;
	},

    "distribute" : function(action) {
		for(var i in this.observers) {
			if(this.observers[i].action === action) {
				this.observers[i].callback.call(this.observers[i].scope, action, this);
			}
		}
	} 
};
