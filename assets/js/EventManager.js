function EventManager(w) {
  this._subscribers = {};
  this._w = w;
}

EventManager.prototype.addSubscriber = function (subscriber, events) {
  for (var i in events) {
    if (!this._subscribers[events[i]]) {
      this._subscribers[events[i]] = [];
    }
    this._subscribers[events[i]].push(subscriber);
  }
};

EventManager.prototype.removeSubscriber = function (subscriber) {
  for (var i in this._subscribers) {
    for (var j in this._subscribers[i]) {
      if (this._subscribers[i][j] === subscriber) {
        this._subscribers[i].splice(j, 1);
      }
    }
  }
};

EventManager.prototype.removeAllSubscribers = function () {
  this._subscribers = {};
};

EventManager.prototype.fireEvent = function (event) {
  var subscribers = this._subscribers[event.name];
  for (var i in subscribers) {
    subscribers[i].notify(event);
  }
};

EventManager.prototype.fireWorkerEvent = function (event) {
    if (event.data !== undefined) {
        var data = {
            x: event.data._x,
            y: event.data._y,
            direction: event.data.getDirection()
        };
        this._w.postMessage([event.name, JSON.stringify(data)]);
    } else this._w.postMessage([event.name]);
};
